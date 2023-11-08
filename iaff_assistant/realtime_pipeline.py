from langchain.embeddings import HuggingFaceInstructEmbeddings
from langchain.vectorstores import Chroma
import tiktoken
import openai
from dotenv import load_dotenv
import numpy as np
import os

HF_EMBEDDINGS = 'BAAI/bge-large-en-v1.5'
CHROMA_LOCAL = "chroma_db"

load_dotenv()

openai.api_type = os.getenv("OPENAI_API_TYPE")
openai.api_version = os.getenv("OPENAI_API_VERSION")
openai.api_base = os.getenv("OPENAI_API_BASE")
openai.api_key = os.getenv("OPENAI_API_KEY")

no_information = "I do not have information on this topic."
system_message = {"role": "system", "content": f'''Use the provided articles delimited by triple quotes to answer questions. If the answer cannot be found in the articles, write {no_information}'''}
max_response_tokens = 500
token_limit = 4096
conversation = []
conversation.append(system_message)


embeddings = HuggingFaceInstructEmbeddings(model_name=HF_EMBEDDINGS)
no_information_embedding = embeddings.embed_query(no_information)

vector_store = Chroma(persist_directory=CHROMA_LOCAL, embedding_function=embeddings)

def num_tokens_from_messages(messages):
    encoding= tiktoken.get_encoding("cl100k_base")
    num_tokens = 0
    for message in messages:
        num_tokens += 4 
        for key, value in message.items():
            num_tokens += len(encoding.encode(value))
            if key == "name": 
                num_tokens += -1  
    num_tokens += 2 
    return num_tokens

def cosine_similarity(em1, em2):
    if len(em1) != len(em2):
        return 0
    
    dot_product = np.dot(em1, em2)
    magnitude_em1 = np.sqrt(np.sum(np.array(em1)**2)) 
    magnitude_em2 = np.sqrt(np.sum(np.array(em2)**2))

    cos_si = dot_product / (magnitude_em1 * magnitude_em2)

    return cos_si

def run_chat():    
    while True:
        query = input("\nEnter your query: ")

        retrieved_docs = vector_store.similarity_search_with_relevance_scores(query, k=3)
        
        #print(retrieved_docs)

        user_input = ""
        for doc in retrieved_docs:
            user_input += f'"""{doc[0].page_content}"""\n\n'

        user_input += f"Question: {query}"

        conversation.append({"role": "user", "content": user_input})
        conv_history_tokens = num_tokens_from_messages(conversation)

        while conv_history_tokens + max_response_tokens >= token_limit:
            del conversation[1] 
            conv_history_tokens = num_tokens_from_messages(conversation)

        response = openai.ChatCompletion.create(
            engine="iaff_assistant",   
            messages=conversation,
            temperature=0.0,
            max_tokens=max_response_tokens,
        )

        conversation.append({"role": "assistant", "content": response['choices'][0]['message']['content']})

        returned_response = "\n" + response['choices'][0]['message']['content'] + "\n"

        if (cosine_similarity(embeddings.embed_query(returned_response), no_information_embedding) < 0.6):
            if (retrieved_docs[0][1] > 0.5):
                returned_response += "Link to article: " + retrieved_docs[0][0].metadata["source"]

        print(returned_response)

def query(conv):      
    messages = []
    messages.append(system_message)
    messages.extend(conv["conversation"])

    user_query = messages[-1]["content"]

    retrieved_docs = vector_store.similarity_search_with_relevance_scores(user_query, k=3)
        
    user_input = ""
    for doc in retrieved_docs:
        user_input += f'"""{doc[0].page_content}"""\n\n'

    user_input += f"Question: {user_query}"

    messages.append({"role": "user", "content": user_input})
    conv_history_tokens = num_tokens_from_messages(messages)

    while conv_history_tokens + max_response_tokens >= token_limit:
        del messages[1] 
        conv_history_tokens = num_tokens_from_messages(messages)

    response = openai.ChatCompletion.create(
        engine="iaff_assistant",   
        messages=messages,
        temperature=0.0,
        max_tokens=max_response_tokens,
    )

    returned_response = response['choices'][0]['message']['content'] + "\n"

    if (cosine_similarity(embeddings.embed_query(returned_response), no_information_embedding) < 0.6):
        if (retrieved_docs[0][1] > 0.5):
            returned_response += "Link to article: " + retrieved_docs[0][0].metadata["source"]

    # messages.pop()
    # messages.append({"role": "user", "content": user_query})
    # messages.append({"role": "assistant", "content": returned_response})
    
    return returned_response

if __name__ == '__main__':
    run_chat()
from pdf2image import convert_from_path
from langchain.embeddings import HuggingFaceInstructEmbeddings
from langchain.vectorstores import Chroma
from langchain.docstore.document import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter
import docx
import tiktoken
import openai
import os

DOC_DIRECTORY = "documents/"
HF_EMBEDDINGS = 'sentence-transformers/all-MiniLM-L6-v2'
CHROMA_LOCAL = "chroma_db"
INDEXED_DOC_LIST = "doc_list.txt"
SOURCE_LINK_FILE = "source.txt"
MD5_FILE = "md5.txt"

os.environ["OPENAI_API_TYPE"] = "azure"
os.environ["OPENAI_API_VERSION"] = "2023-07-01-preview"
os.environ["OPENAI_API_BASE"] = "https://genairesearchinstance.openai.azure.com/"
os.environ["OPENAI_API_KEY"] = "473c3604b94e469eb7890ab2281eed72"

openai.api_type = os.getenv("OPENAI_API_TYPE")
openai.api_version = os.getenv("OPENAI_API_VERSION")
openai.api_base = os.getenv("OPENAI_API_BASE")
openai.api_key = os.getenv("OPENAI_API_KEY")

system_message = {"role": "system", "content": '''Use the provided articles delimited by triple quotes to answer questions. If the answer cannot be found in the articles, write "I could not find an answer."'''}
max_response_tokens = 500
token_limit = 4096
conversation = []
conversation.append(system_message)

embeddings = HuggingFaceInstructEmbeddings(model_name=HF_EMBEDDINGS)

vector_store = Chroma(persist_directory=CHROMA_LOCAL, embedding_function=embeddings)

def preprocess_docs():    
    doc_paths = []
    with open(INDEXED_DOC_LIST, 'r') as f:
        doc_paths = f.readlines()
    doc_paths = [DOC_DIRECTORY + path.rstrip() + "/" for path in doc_paths]
    
    for doc_path in doc_paths:
        ingest_doc(doc_path)

def ingest_doc(doc_path):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200        
    )
    link = ""
    with open(doc_path + "/source.txt", 'r') as f:
        link = f.readline()

    for file in os.listdir(doc_path):
        if (file != MD5_FILE and file != SOURCE_LINK_FILE):
            doc = docx.Document(doc_path + file)
            content = ""
            for p in doc.paragraphs:
                content += p.text

            chunks = text_splitter.split_text(text=content)
            for i in range(0, len(chunks)):                
                new_doc = Document(
                    page_content=chunks[i],
                    metadata={
                        "source": link,                        
                    }
                )
                vector_store.add_documents([new_doc], ids=[file + "_chunk" + str(i)])
            
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

def run_chat():
    while True:
        query = input("\nEnter your query: ")
        retrieved_docs = vector_store.similarity_search(query, k=2)
        
        user_input = ""
        for doc in retrieved_docs:
            user_input += f'"""{doc.page_content}"""\n\n'

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

        print("\n" + response['choices'][0]['message']['content'] + "\n")

def main():
    #preprocess_docs()
    run_chat()
    
            
if __name__ == '__main__':
    main()
import tiktoken
import openai
import os

os.environ["OPENAI_API_TYPE"] = "azure"
os.environ["OPENAI_API_VERSION"] = "2023-07-01-preview"
os.environ["OPENAI_API_BASE"] = "https://genairesearchinstance.openai.azure.com/"
os.environ["OPENAI_API_KEY"] = "473c3604b94e469eb7890ab2281eed72"

openai.api_type = os.getenv("OPENAI_API_TYPE")
openai.api_version = os.getenv("OPENAI_API_VERSION")
openai.api_base = os.getenv("OPENAI_API_BASE")
openai.api_key = os.getenv("OPENAI_API_KEY")

system_message = {"role": "system", "content": '''You are an assistant for structured data transformation task. 
                  You transform the input data from user into structured data. 
                  When transforming do not omit any part of the input data.'''}
max_response_tokens = 250
token_limit = 4096
conversation = []
conversation.append(system_message)

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

while True:
    user_input = input("")     
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
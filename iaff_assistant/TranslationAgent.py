import openai
from dotenv import load_dotenv
import os

load_dotenv()

max_response_tokens=500

openai.api_type = os.getenv("OPENAI_API_TYPE")
openai.api_version = os.getenv("OPENAI_API_VERSION")
openai.api_base = os.getenv("OPENAI_API_BASE")
openai.api_key = os.getenv("OPENAI_API_KEY")

def translate(text, target_language):
    response = openai.ChatCompletion.create(
        engine="iaff_assistant",               
        messages=[{"role": "system", "content": "You are a translation agent. If texts from user are already in target language, simply output the original texts and do not add any descriptions."},
                    {"role": "user", "content": f"Translate this text to {target_language}:\n`{text}`"}],
        temperature=0.0,
        max_tokens=max_response_tokens,
    )

    translated_text = response['choices'][0]['message']['content']
    return translated_text        
 
if __name__ == "__main__":
    while True:
        text_to_translate = input("Input text to translate: ")
        target_language = "Polish"

        openai_translation = translate(text_to_translate, target_language)
        print(f"Translation: {openai_translation}")

import openai
from dotenv import load_dotenv
import os

load_dotenv()

max_response_tokens=1000

openai.api_type = os.getenv("OPENAI_API_TYPE")
openai.api_version = os.getenv("OPENAI_API_VERSION")
openai.api_base = os.getenv("OPENAI_API_BASE")
openai.api_key = os.getenv("OPENAI_API_KEY")

async def translate(text, target_language):
    system_prompt = f"I want you to act as a {target_language} translator. Translate the text below to {target_language}. If the text is unclear, a proper noun, or cannot be translated directly, output it exactly as it is. Do not add any explanations, apologies or ask for additional context."
    user_prompt = f'''Text: \n{text}'''
    response = await openai.ChatCompletion.acreate(
        engine="iaff_assistant",               
        messages=[{"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}],
        temperature=0.0,
        max_tokens=max_response_tokens,
    )

    translated_text = response['choices'][0]['message']['content']
    return translated_text
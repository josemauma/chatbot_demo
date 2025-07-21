from chatbot_app.Services import LLMAPI, SYSTEM_PROFILE
from chatbot_app import upload_info_company
import json

llm = LLMAPI()

# Supongamos que upload_info_company() devuelve dict, lo convertimos a string
info_company_obj = upload_info_company()
if isinstance(info_company_obj, (dict, list)):
    info_company = json.dumps(info_company_obj, indent=2)
else:
    info_company = info_company_obj

system_message = {
    "role": "system",
    "content": f"""{SYSTEM_PROFILE['content']}
Company information: {info_company}
"""
}

user_input = input("Escribe tu mensaje: ")
user_message = {
    "role": "user",
    "content": user_input
}

# Aquí metemos system_message para que el LLM reciba la info de la empresa
messages = [system_message, user_message]

data = {
    "model": "microsoft/phi-4-mini-instruct",
    "messages": messages,
    "temperature": 0.2
}

info =  llm.post_chat_completition(data)
response = info["choices"][0]["message"]["content"]
print("Response from LLM:", response)

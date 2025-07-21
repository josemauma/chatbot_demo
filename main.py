import os
from dotenv import load_dotenv
from flask import Flask, render_template, request, jsonify
import requests
from chatbot_app.Services import LLMAPI, SYSTEM_PROFILE
from chatbot_app import upload_info_company
import json

app = Flask(__name__)

llm = LLMAPI()

# Cargamos info empresa una vez para no repetirla en cada request
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

# Contexto inicial con solo el system_message
base_messages = [system_message]

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message", "")
    if not user_input:
        return jsonify({"response": "Please send a message."})

    # Copiamos la base para no modificar la original en memoria
    messages = base_messages.copy()

    # Añadimos el mensaje del usuario
    messages.append({"role": "user", "content": user_input})

    data = {
        "model": "microsoft/phi-4-mini-instruct",
        "messages": messages,
        "temperature": 0.2
    }

    load_dotenv()
    url = os.getenv("LLMAPI") + "/chat/completions"
    response_llm = requests.post(url, json=data)
    response_llm.raise_for_status()

    info = response_llm.json()
    response = info["choices"][0]["message"]["content"]

    # Devolvemos la respuesta en JSON para que el JS la reciba
    return jsonify({"response": response})


if __name__ == "__main__":
    app.run(debug=True)

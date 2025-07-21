import os
from dotenv import load_dotenv
import requests

load_dotenv()

class LLMAPI:
    BASE_URL = os.getenv("LLMAPI")
    
    def __init__(self):
        pass
    
    def get_models(self):
        response = requests.post(f"{self.BASE_URL}/models")
        return response.json()
    
    def post_chat_completition(self,data):
        response = requests.post(f"{self.BASE_URL}/chat/completions", json=data)
        return response.json()
    
    def post_completitions(self,data):
        response = requests.post(f"{self.BASE_URL}/completitions", json=data)
        return response.json()
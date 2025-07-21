from dotenv import load_dotenv
import json
import os

load_dotenv()

root_company = os.getenv("DATA_COMPANY")


def upload_info_company(root=root_company):
    """
    Load company information from a JSON file.
    
    :param root: Path to the JSON file containing company information.
    :return: Dictionary with company information.
    """
    with open(root, "r", encoding="utf-8") as f:
        return json.load(f)
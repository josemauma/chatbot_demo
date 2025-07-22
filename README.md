# 🤖 AI Chatbot for Car Washing Company

## Description

This project implements an AI-based chatbot that runs entirely locally. The chatbot is designed to answer questions related to the services, prices, and contact information of a fictitious car washing company.

It uses Microsoft's phi4 language model to generate precise and contextual responses, supported by a carefully crafted prompt and a company information database.

---

## Features

- Responds to questions about services, prices, payment methods, and contact details.
- Works offline, fully local.
- Simple and responsive web interface.
- Maintains conversational context.
- Quick option buttons for easier interaction.
- Responses formatted with line breaks for better readability.

---

## Technologies Used

- Python 3.9
- Flask (backend web framework)
- JavaScript, HTML, CSS (frontend)
- Microsoft phi4 language model (local)

---

## Installation

1. Clone this repository:

```bash
git clone https://github.com/your_username/car-washing-chatbot
cd car-washing-chatbot

```

2. Create and activate a virtual environment:

```bash
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Configure and run your local model server.

5. Run the main file:

```bash
python main.py
```

6. Open your browser http://127.0.0.1:5000 and use the chatbot

---

## Usage

- The chatbot responds only about the services offered.

- When asked about services, prices, payment, or contact, it provides accurate information.

- If the query is outside the scope, it replies indicating it can only provide information about the services.

---

## Contributions

This project welcomes improvements. If you have suggestions or find bugs, please open an issue or pull request.



from flask import Flask, request, jsonify
import asyncio
from langchain_openai import ChatOpenAI
from langchain.agents import AgentType
from pica_langchain import PicaClient, create_pica_agent
from pica_langchain.models import PicaClientOptions
from dotenv import load_dotenv
from flask_cors import CORS
from util import websearchforissue, send_slack_notification


app = Flask(__name__)
CORS(app)  # Allow frontend to access backend

# Load environment variables
load_dotenv()

@app.route('/search_issue', methods=['POST'])
async def search_issue():
    data = request.get_json()
    error_message = data.get("error", "")

    if not error_message:
        return jsonify({"error": "No error message provided"}), 400

    result = await websearchforissue(error_message)
    return jsonify(result)

# ✅ Flask endpoint to send a Slack notification
@app.route('/notify_slack', methods=['POST'])
async def notify_slack():
    data = request.get_json()
    error_message = data.get("error", "")

    if not error_message:
        return jsonify({"error": "No error message provided"}), 400

    response = await send_slack_notification(error_message)
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)

from langchain_openai import ChatOpenAI
from langchain.agents import AgentType
from pica_langchain import PicaClient, create_pica_agent
from pica_langchain.models import PicaClientOptions
from dotenv import load_dotenv
from flask_cors import CORS
from prompt import ErrorSummarizerPrompt, SlackNotifyPrompt
import os
load_dotenv()

# Initialize Pica client
pica_client = PicaClient(
    secret= os.getenv("PICA_SECRET_KEY"),
    options=PicaClientOptions(
       connectors=["SLACK_CONNECTOR_KEY","OPENAI_CONNECTOR_KEY"]
    )
)

# Initialize LLM model
llm = ChatOpenAI(temperature=0, model="gpt-4o")

# Create Pica agent
agent = create_pica_agent(
    client=pica_client,
    llm=llm,
    agent_type=AgentType.OPENAI_FUNCTIONS
)





async def websearchforissue(error_message):
    try:
        result = agent.invoke({
            "input": f"{ErrorSummarizerPrompt} {error_message}"
        })
        return {"output": result.get("output", "No solution found.")}
    except Exception as e:
        return {"error": str(e)}
    



#   Function to send Slack notification
async def send_slack_notification(error_message):
    try:
        slack_message = (
            f" *Issue Alert!* \n\n"
            f"*Issue Detected:* {error_message}\n\n"
            "🔹 *Please check and resolve it ASAP!*"
        )

        slack_response = agent.invoke({
            "input": f"{SlackNotifyPrompt} {slack_message}"
        })

        return {"status": "Notification sent successfully", "response": slack_response.get("output", "")}

    except Exception as e:
        return {"error": str(e)}

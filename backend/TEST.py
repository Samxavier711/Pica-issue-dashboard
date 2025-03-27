from langchain_openai import ChatOpenAI
from langchain.agents import AgentType
from pica_langchain import PicaClient, create_pica_agent
from pica_langchain.models import PicaClientOptions
from dotenv import load_dotenv

pica_client = PicaClient(secret="PICA_SECRET_KEY",options=PicaClientOptions(
                connectors=["SLACK_CONNECTOR_KEY","OPENAI_CONNECTOR_KEY"]
                
            ))
load_dotenv()
llm = ChatOpenAI(temperature=0, model="gpt-4o")

agent = create_pica_agent(
    client=pica_client,
    llm=llm,
    agent_type=AgentType.OPENAI_FUNCTIONS
)


websearchforissue=agent.invoke({
    "input":(" Send a notfication on slack: pica-integration channel saying there is an error please resolve it")

})
# SlackNotifier = agent.invoke({
#     "input": ("")
# })

# GithubIssueCreator = agent.invoke({
#     "input": ("")
# })

print(f"Result: {websearchforissue}")
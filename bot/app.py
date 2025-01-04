from flask import Flask, request, jsonify
from flask_cors import CORS
from crewai import Agent, Task, Process, Crew
from langchain_google_genai import ChatGoogleGenerativeAI
import os
import json
from dotenv import load_dotenv
load_dotenv()

api_key = os.getenv("API_KEY")
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
# Define agent configurations for different bots
def get_agent_for_type(bot_type):
    if bot_type == 'NLPtoSQL':
        return Agent(
                role = 'NLP to SQL converter',
        goal = 'Generate Natural language to sql queries from the given input',
        backstory = 'You are a Database Engineer who is well versed in understanding natural languages and converting them into SQL queries.',
        verbose =False,
        llm = ChatGoogleGenerativeAI(
            model="gemini-pro",verbose=True,temperature=0.1, google_api_key=api_key
        )
        )
    elif bot_type == 'doubt_clarification':
        print("hello")
        return Agent(
            role = 'Doubt Clarification Assistant',
            goal = 'Clarify user doubts related to SQL and DBMS, answer queries, and provide explanations.',
            backstory = 'You are a knowledgeable assistant who can help clarify doubts related to SQL and dbms',
            verbose = False,
            llm = ChatGoogleGenerativeAI(
                model="gemini-pro", verbose=True, temperature=0.1, google_api_key=api_key
            )
        )
    elif bot_type == 'optimized_code':
        return Agent(
            role = 'SQL Optimizer Assistant',
            goal = 'Provide optimized SQL code for given queries.',
            backstory = 'You are an assistant capable of providing optimized SQL code based on user queries. You understand how to improve SQL performance.',
            verbose = False,
            llm = ChatGoogleGenerativeAI(
                model="gemini-pro", verbose=True, temperature=0.1, google_api_key=api_key
            )
        )
    else:
        raise ValueError("Invalid bot type")

@app.route('/process', methods=['POST'])
def process_input():
    try:
        # Get the query and type from the request
        data = request.json
        query = data.get('query')
        bot_type = data.get('type')

        if not query or not bot_type:
            return jsonify({'error': 'Query and type are required'}), 400
        
        # Initialize the agent dynamically based on the bot type
        agent = get_agent_for_type(bot_type)
        nlp2sqlDescription=f"generate a answer based on the input from the user and make sure the data is accurate and only taken from the given context txt file,, here's the query : {query}"
        if bot_type == 'NLPtoSQL':
            nlp2sqlDescription=f"generate SQL query based on the input from the user and make sure the query is accurate, here's the query : {query}"
        # Create the task for the agent\
        print(nlp2sqlDescription)
        nlp_task = Task(
            description=nlp2sqlDescription,
            agent=agent,
            expected_output="Generated response in simple English language"
        )
        
        # Create the crew with the agent and task
        crew = Crew(
            agents=[agent],
            tasks=[nlp_task],
            verbose=False,
        )
        
        # Run the crew task
        op = crew.kickoff()
        
        # Assuming op is the result of the query processed by the agent
        output = op  # Replace with actual output from the agent
        
        # Return the output in the response
        return jsonify({'output': output})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run()

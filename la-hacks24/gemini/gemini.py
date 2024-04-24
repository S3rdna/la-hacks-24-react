"""
At the command line, only need to run once to install the package via pip:

$ pip install google-generativeai
"""
import json
import celery
from flask import Flask, jsonify

import google.generativeai as genai

# setup flask
app = Flask(__name__)

# setup genai
genai.configure(api_key="AIzaSyAJ-3pgHVhMtjlkAbGSe3bfwtHGDHYVxUs")

# Set up the model
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 0,
    "max_output_tokens": 8192,
}

# setup genai secuirty settings
safety_settings = [
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
]
model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest",
                              generation_config=generation_config,
                              safety_settings=safety_settings)


def chat():

    prompt = "Below are two sets of data. the first is a user's preferences." +\
        " the second is a large set of restaurants in the area. Using the" +\
        " user's preferences pick out all the restaurants that will interest the user." +\
        " Return a json file with the data of all the restaurants that fit the criteria."
    preferences = {"spicy": 5, "fishy": False, "allergies": ["lactose", "nuts"], "cuisinesTypes": [
        "mexican", "italian", "american", "indian", "kbbq"]}
    dataset1 = ", ".join(
        [f"{key}: {value}" for key, value in preferences.items()])
    prompt += "\n\nDataset 1:\n" + \
        "[ " + dataset1 + "]"

    with open("./recommendations.json") as fs:
        prompt += "\n\n\n\nDataset 2:\n"
        for line in fs:
            prompt += line
    response = model.generate_content(prompt)
    return ({
        "response": response
    })


@ app.route("/")
def root():
    return chat()
def send_message(string):
    convo.send_message(string)  # prompt
    print(convo.last.text)  # responsse
    # write the solutions onto a text file
    filename = "solutions.txt"
    solutions = open(filename, 'w');
    for line in convo.last.text:
        solutions.write(line)
    return convo.last.text

message = "Based on the following data, recommend to the user some restaurants."
file = open("recommendations.json", 'r')
for line in file:
    message += line

message += "According to the user, the following are the user's preferences for food. Based on this, generate a list of restaurants (no food trucks) on each line with no words before it."
quiz = open("quiz_sample.txt", 'r')
for line in quiz:
    message += line

send_message(message)

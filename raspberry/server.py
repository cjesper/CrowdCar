from flask import Flask
import requests
from time import sleep
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"


if __name__ == "__main__":
    print "Hi"
    while True:
        r = requests.get('http://127.0.0.1:5000/commands')
        chosen_command = r.json()[0]
        print "I chose " + str(chosen_command["command_name"])
        sleep(5)

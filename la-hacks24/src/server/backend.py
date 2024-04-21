from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/login', methods=['GET'])
def test():
    # get data from react
    # check against db
    # if user in db, if pass in db, then login, else nothing
    return 'this shit too easy'


if __name__ == '__main__':
    app.run(port=8888)

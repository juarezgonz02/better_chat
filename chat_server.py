from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from flask_cors import CORS
from lib.control import control

controlR = control() 
app = Flask(__name__)
api = Api(app)
CORS(app)

class Pausar(Resource):
    def get(self):
        controlR.push_button()
        return { 'response': "Se ha detenido"}

api.add_resource(Pausar, '/control')  # Route_1


if __name__ == '__main__':
     app.run(port='5000')

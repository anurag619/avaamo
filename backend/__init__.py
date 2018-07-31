
from pymongo import MongoClient
import pdb
import unicodedata
import json
from os import listdir
from os.path import isfile, join
from datetime import datetime
from flask_compress import Compress
import hashlib
from flask_cors import CORS, cross_origin
import requests
from flask_assets import Environment, Bundle
from urlparse import urlparse, urlunparse
import os, sys
from pymongo import MongoClient
#from flask_login import LoginManager, UserMixin, login_required,login_user,logout_user


sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))


from flask import Flask,request
app = Flask(__name__)
client = MongoClient()
app.secret_key = "horticulturalbhaddo"
#app.config['UPLOAD_FOLDER'] = '/frontend/static/cImages/'

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 605000
Compress(app)
CORS(app)

# if __name__ == '__main__':
#     app.run(host='0.0.0.0',port=5000)

import backend.main

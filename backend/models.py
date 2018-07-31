
from mongoengine import *
from werkzeug import generate_password_hash, check_password_hash
# from instamojo import Instamojo
import re
import sys
sys.path.append("../")
# from backend import app
from datetime import datetime,timedelta
import pdb

connect('avaamo',host="localhost")


class Agile(Document):
    title = StringField(default='')
    description = StringField(default='')
    status = StringField(default='')
    asiignee = StringField(default='')
    creator = StringField(default='')
    priority = StringField(default='')

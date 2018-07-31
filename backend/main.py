
from flask_login import UserMixin,logout_user
from backend import app
from flask import render_template,request,make_response,send_file,session,redirect,url_for
from models import *
import json


def makeResponse(msg,success,data={}):
	resp = json.loads('{}')
	resp['success'] = success
	resp['msg'] = msg
	resp['data'] = data
	return json.dumps(resp)

@app.route('/api/all',methods=['GET'])
def board_all():
    print request.args
    try:
        boards = Agile.objects()
        boardJson = map(lambda x : json.loads(x.to_json()),boards)

    except Agile.DoesNotExist:
        boardJson = []
    return makeResponse('got data', True,boardJson)

@app.route('/api/add',methods=['POST'])
def board_add():
    params = json.loads(request.data)
    print params
    
    board = Agile(description=params['description'],title=params['title'] or '',status=params['status'] or '',asiignee=params['asiignee'] or '',creator=params['creator'] or '',priority=params['priority'] )
    board.save()

    return makeResponse('saved succesfully', True,{})

@app.route('/api/edit/<id>',methods=['PUT'])
def board_edit(id):
    
    params = json.loads(request.data)

    try:
        board = Agile.objects.get(id__iexact=id)
    except:
        return makeResponse('no such board exists', False)
    
    board.title = params['title']
    board.description = params['description']
    board.status = params['status']
    board.asiignee = params['asiignee']
    board.creator = params['creator']
    board.priority = params['priority']
    board.save()

    return makeResponse('updated board',True, {})

@app.route('/api/delete/<id>',methods=['DELETE'])
def board_delete(id):
    params = request.get_json()

    try:
        emp = Agile.objects.get(id__iexact=id)
    except:
        return makeResponse('no such Agile exists', False)
    try:
		emp.delete()
		return makeResponse("Agile deleted successfully",True)
    except Exception as e:
		print e
		return makeResponse("Agile cannot be deleted because of an unknown issue.",False)

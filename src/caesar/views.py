from django.core import serializers
from django.shortcuts import render
from django.http import JsonResponse
import json

from . import utils

def guess_json_answer(request):
    # handle request
    my_json = request.body
    data = json.loads(my_json)
    # check if key exists in database
    if utils.r_server_on:
        temp = utils.get_variable(data['text'])
        if temp:
            temp = json.loads(temp)
            data['text'] = temp['text']
            data['offset'] = temp['offset']
            return JsonResponse(dict(data))

    # calculate result, store into database and send response
    offset = utils.break_caesar(data['text'])
    result = utils.rotate_word(data['text'], offset)
    key = data['text']
    data['text'] = result
    data['offset'] = 26 - offset
    if utils.r_server_on:
        utils.set_variable(key, json.dumps(data))
    return JsonResponse(dict(data))

def json_answer(request):
    # handle request
    my_json = request.body
    data = json.loads(my_json)
    # check if key exists in database
    if utils.r_server_on:
        temp = utils.get_variable(data)
        if temp:
            data['text'] = temp
            return JsonResponse(dict(data))

    # calculate result, store into database and send response
    result = utils.rotate_word(data['text'], data['offset'])
    if utils.r_server_on:
        utils.set_variable(data, result)
    data['text'] = result

    return JsonResponse(dict(data))

def index(request):
    return render(request, 'index.html')
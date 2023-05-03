#!/usr/local/bin/python
import requests
import json

from flask import Flask, render_template
app = Flask(__name__, static_url_path='')
#app.debug = True

def getTypeColor (id):
    if(id == 'bug'):
        return "#a3b21b"
    elif(id == 'dark'):
        return "#3c2c23"
    elif(id == 'dragon'):
        return "#775ee1"
    elif(id == 'electric'):
        return "#e79302"
    elif(id == 'normal'):
        return "#ada595"
    elif(id == 'fire'):
        return "#c72100"
    elif(id == 'fighting'):
        return "#672512"
    elif(id == 'ice'):
        return "#6cd2f5"
    elif(id == 'water'):
        return "#1169c0"
    elif(id == 'flying'):
        return "#5c72d3"
    elif(id == 'grass'):
        return "#72c235"
    elif(id == 'poison'):
        return "#69236c"
    elif(id == 'ground'):
        return "#b39135"
    elif(id == 'psychic'):
        return "#e03066"
    elif(id == 'rock'):
        return "#a1893e"
    elif(id == 'ghost'):
        return "#444490"
    elif(id == 'steel'):
        return "#8e8e9f"
    elif(id == 'fairy'):
        return "#f1a6f1"
    else :
        return "#000000"

def buildTypes(types):
    temp = ""
    for type in types:
        if(type[0] == '--'):
            continue
        temp = temp + "<span class=\"label label-default\" style=\"background-color:" + type[1] + "\">" + type[0] + "</span>      "
    return temp

def buildWeakness(types):
    temp = ""
    typesSoFar = []
    for type in types:
        if(type[0] == '--'):
            continue
        url = "https://pokeapi.co/api/v2/type/" + type[0] + "?limit=1"
        headers = {
            'x-rapidapi-host': "Pokestefan-skliarovV1.p.rapidapi.com",
            'x-rapidapi-key': "eb80d8ba3bmshebbd1ae9c309ea2p1bbcc5jsn58636811d996"
            }

        response = requests.request("GET", url, headers=headers)
        if(response.status_code == 200):
            data = json.loads(response.text);

            weakTypes = data['damage_relations']['double_damage_from']
            for x in weakTypes:
                if(x['name'] in typesSoFar):
                    continue
                typesSoFar.append(x['name'])
                temp = temp + "<span class=\"label label-default\" style=\"background-color:" + getTypeColor(x['name']) + "\">" + x['name'] + "</span>      "

    return temp


@app.route('/pokemon/<id>/<number>', methods=['GET'])
def generatePokemon(id, number):
    url = "https://pokeapi.co/api/v2/pokemon/" + id + "?limit=1"
    headers = {
        'x-rapidapi-host': "Pokestefan-skliarovV1.p.rapidapi.com",
        'x-rapidapi-key': "eb80d8ba3bmshebbd1ae9c309ea2p1bbcc5jsn58636811d996"
        }

    response = requests.request("GET", url, headers=headers)
    if(response.status_code == 200):
        data = json.loads(response.text)
        artwork = ""
        if (data['sprites']['other']['official-artwork']['front_default'] == None):
            artwork = data['sprites']['front_default']
        else:
            artwork = data['sprites']['other']['official-artwork']['front_default']

        move = []
        for x in range(4):
            try:
                move.append(data["moves"][x]["move"]["name"])
            except:
                move.append("--")

        types = []
        for x in range(2):
          try:
              # move.append(data["types"][x]["move"]["name"])
              temp = []
              temp.append(data["types"][x]['type']['name']);
              temp.append(getTypeColor(data["types"][x]['type']['name']))
              types.append(temp)
          except:
              temp = ["--", "--"]
              types.append(temp)


        rtnDict = json.dumps({
            "status" : 200,
            "name": data['name'],
            "artwork": artwork,
            "move1" : move[0],
            "move2" : move[1],
            "move3" : move[2],
            "move4" : move[3],
            "type1" : types[0][0],
            "type1Color" : types[0][1],
            "type2" : types[1][0],
            "type2Color" : types[1][1],
            "hp" : data['stats'][0]['base_stat'],
            "def" : data['stats'][2]['base_stat'],
            "atk" : data['stats'][1]['base_stat'],
            "spd" : data['stats'][5]['base_stat'],
            "sa" : data['stats'][3]['base_stat'],
            "sd" : data['stats'][4]['base_stat'],
            "height" : data['height'] / 10,
            "weight" : data['weight'] / 10,
            "types" : buildTypes(types),
            "weaknesses" : buildWeakness(types),
            "abi" : data['abilities'][0]['ability']['name']

        })

        return (rtnDict)

    return json.dumps({"msg": "Error generating pokemon, try again", "status" : 503})


@app.route('/')
def index():
    return render_template('index.html')

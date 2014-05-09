import json

with open("recipes.json") as f:
    recipes=json.load(f)

def get_input(string):
    return string.lower().split()

def common(this,that):
    

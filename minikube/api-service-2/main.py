from fastapi import FastAPI
# generate random integer values
from random import seed
from random import randrange
import os

app = FastAPI()

def calculator(x,y):
    return (x + y)


@app.get("/randomadd")
def read_root():
    value = randrange(100)
    value2 = randrange(50)
    return {
    "randomadd": calculator(value, value2),
    "value": value,
    "value2": value2
    }


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}

@app.get("/environment")
def read_environ():
    print(os.environ)
    return {"check": "logs"}

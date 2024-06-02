# models/dog.py
from pydantic import BaseModel
from typing import Optional
from backend.database import *


class Dog(BaseModel):
    name: str
    age: float
    race: str
    owner_id: int
    weight: float  # in kg
    size: Optional[str] = None

    def __init__(self, **values):
        super().__init__(**values)
        self.size = self.get_size()
        self.save_dog()

    def get_size(self):
        if self.weight <= 10:
            return SMALL
        if self.weight <= 25:
            return MEDIUM
        return BIG

    def save_dog(self):
        # check if owner_id exists in dog_owner collection
        dog_owner_collection, dog_owner_cluster = get_collection(DOG_OWNER)
        owner_exists = dog_owner_collection.find_one({ID: self.owner_id}) is not None

        if not owner_exists:
            raise ValueError(f"Owner with ID {self.owner_id} does not exist.")

        data = {NAME: self.name, AGE: self.age, RACE: self.race, OWNER_ID: self.owner_id, WEIGHT: self.weight,
                SIZE: self.size}
        collection, cluster = get_collection(DOG)
        collection.insert_one(data)
        cluster.close()

        # update dog owner dogs list
        # TODO: check if to save unique names of the dogs owner or to save dog in dogs list by id
        dog_owner_collection.update_one(filter={ID: self.owner_id}, update={'$push': {DOGS: [self.name]}})
        dog_owner_cluster.close()

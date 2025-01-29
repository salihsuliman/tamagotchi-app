import { useState } from "react";
import "./App.css";
import { Animal } from "./components/Animal";
import { AddAnimal } from "./components/AddAnimal";
import { AnimalType } from "./types";

const startingList: AnimalType[] = [
  { id: 1, animal: "Poodle", name: "Poodie the doodle" },
];

function App() {
  const [animalList, setAnimalList] = useState<AnimalType[]>(startingList);
  const [addAnimal, setAddAnimal] = useState(false);

  return (
    <>
      <div className="animal-page">
        <button onClick={() => setAddAnimal(true)}>Add Animal</button>

        <div className="animal-wrapper">
          {animalList.map((animal) => {
            return (
              <Animal
                key={animal.id}
                animal={animal}
                setAnimalList={setAnimalList}
              />
            );
          })}
        </div>
      </div>
      {addAnimal && (
        <AddAnimal
          close={() => setAddAnimal(false)}
          setAnimalList={setAnimalList}
        />
      )}
    </>
  );
}

export default App;

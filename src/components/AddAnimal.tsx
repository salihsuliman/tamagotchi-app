import { useState } from "react";
import { animalOptions, AnimalType } from "../types";

type AddAnimalProps = {
  close: () => void;
  setAnimalList: React.Dispatch<React.SetStateAction<AnimalType[]>>;
};

export const AddAnimal = ({ close, setAnimalList }: AddAnimalProps) => {
  const [animalType, setAnimalType] = useState("");
  const [animalName, setAnimalName] = useState("");

  const handleAddAnimal = () => {
    if (animalType && animalName) {
      console.log(`Animal Created: ${animalType} named ${animalName}`);

      setAnimalList((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          animal: animalType,
          name: animalName,
        },
      ]);
      close();
    } else {
      alert("Please select an animal and provide a name.");
    }
  };

  const animalImage = animalOptions.find(
    (option) => option.Animal === animalType
  )?.Image;

  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h1>Add a New Animal</h1>
        {animalImage && (
          <div className="animal-image-container">
            <img src={animalImage} alt={animalType} className="animal-image" />
          </div>
        )}

        <div className="animal-animal">
          <label htmlFor="animalType">Select Animal:</label>
          <select
            id="animalType"
            value={animalType}
            onChange={(e) => setAnimalType(e.target.value)}
          >
            <option value="">--Select an Animal--</option>
            {animalOptions.map((animal) => (
              <option key={animal.Animal} value={animal.Animal}>
                {animal.Animal}
              </option>
            ))}
          </select>
        </div>
        <div className="animal-animal">
          <label htmlFor="animalName">Name Your Animal:</label>
          <input
            type="text"
            id="animalName"
            value={animalName}
            onChange={(e) => setAnimalName(e.target.value)}
          />
        </div>
        <button className="action-button" onClick={handleAddAnimal}>
          Add Animal
        </button>
        <button className="close-button" onClick={close}>
          Close
        </button>
      </div>
    </div>
  );
};

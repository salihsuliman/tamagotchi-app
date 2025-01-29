import { useEffect, useState, useRef } from "react";
import { animalOptions, AnimalType } from "../types";

type AnimalProps = {
  animal: AnimalType;
  setAnimalList: React.Dispatch<React.SetStateAction<AnimalType[]>>;
};

export const Animal = ({ animal, setAnimalList }: AnimalProps) => {
  const [happiness, setHappiness] = useState(50);
  const [hunger, setHunger] = useState(50);
  const [sleepiness, setSleepiness] = useState(50);
  const [isEditingName, setIsEditingName] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const animalData = animalOptions.find(
    (option) => option.Animal === animal.animal
  )!;

  useEffect(() => {
    const interval = setInterval(() => {
      // Decrease happiness faster if hunger or sleepiness is full
      setHappiness((prev) => {
        if (hunger >= 100 || sleepiness >= 100) {
          return Math.max(prev - (animalData.HappinessRate + 5), 0);
        }
        return Math.max(prev - animalData.HappinessRate, 0);
      });

      // Increase hunger and sleepiness over time
      setHunger((prev) => Math.min(prev + animalData.HungerRate, 100));
      setSleepiness((prev) => Math.min(prev + animalData.SleepRate, 100));
    }, 5000);

    return () => clearInterval(interval);
  }, [hunger, sleepiness, animalData]);

  // Handle editing name mode
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        nameInputRef.current &&
        !nameInputRef.current.contains(event.target as Node)
      ) {
        setIsEditingName(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        setIsEditingName(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const feedAnimal = () => {
    setHunger((prev) => Math.max(prev - (animalData.HungerRate + 10), 0));
  };

  const playWithAnimal = () => {
    setHappiness((prev) =>
      Math.min(prev + (animalData.HappinessRate + 10), 100)
    );
  };

  const restAnimal = () => {
    setSleepiness((prev) => Math.max(prev - (animalData.SleepRate + 10), 0));
  };

  const updateName = (newName: string) => {
    setAnimalList((prev) =>
      prev.map((a) => (a.id === animal.id ? { ...a, name: newName } : a))
    );
  };

  return (
    <div className="animal-container">
      <div className="animal-name">
        <h1>{animal.animal}</h1>
      </div>
      <div className="animal-animal">
        <img
          src={animalData.Image}
          alt="Your animal"
          className="animal-image"
        />
        {isEditingName ? (
          <input
            ref={nameInputRef}
            type="text"
            value={animal.name}
            onChange={(e) => updateName(e.target.value)}
            onBlur={() => setIsEditingName(false)}
            autoFocus
          />
        ) : (
          <h2 onClick={() => setIsEditingName(true)}>{animal.name}</h2>
        )}
      </div>
      <div className="animal-stats">
        <div className="stat">
          <strong>Hunger:</strong>
          <div className="meter">
            <div className="meter-fill" style={{ width: `${hunger}%` }}></div>
          </div>
          <button className="action-button" onClick={feedAnimal}>
            Feed
          </button>
        </div>
        <div className="stat">
          <strong>Happiness:</strong>
          <div className="meter">
            <div
              className="meter-fill"
              style={{ width: `${happiness}%` }}
            ></div>
          </div>
          <button className="action-button" onClick={playWithAnimal}>
            Play
          </button>
        </div>
        <div className="stat">
          <strong>Sleep:</strong>
          <div className="meter">
            <div
              className="meter-fill"
              style={{ width: `${sleepiness}%` }}
            ></div>
          </div>
          <button className="action-button" onClick={restAnimal}>
            Rest
          </button>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { useEffect, useState } from "react";
import { __GetAllBreeds, __GetBreedInfo } from "../services/ApiClient";

const Home = () => {
  const [dogs, setDogs] = useState([]);
  const [breed, setBreed] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getBreeds();
  }, []);

  const getBreeds = async () => {
    try {
      setError("")
      const data = await __GetAllBreeds();
      let dogsList = [];
      for (const property in data.message) {
        dogsList.push(property)
        let sublist = data.message[property]
        if (sublist.length > 0) {
          sublist.forEach(x => {
            dogsList.push(x)
          })
        }
      }
      setDogs(dogsList.sort());
    } catch (error) {
      setError(error.message)
    }
  };

  const handleClick = async (breed) => {
    try {
      setError("")
      setBreed(breed)
      const data = await __GetBreedInfo(breed);
      setImage(data.message)
    } catch (error) {
      setError(error.message)
    }
  }

  const handleGoBack = () => {
    setBreed("");
    setImage("")
  }


  return (
    <div >
      <header>
        <h1>Dogs!</h1>
        <h3>🐾</h3>
      </header>
      <div>
        {
          breed ?
            <div>
              <h3>Details</h3>
              <div>
                <button onClick={() => handleGoBack()}>go back</button>
              </div>
              <div>
                {breed}
              </div>
              {error ? <div>{error}</div> :
                <img
                  src={image}
                  alt={breed}
                />}
            </div> :
            <ul>
              {dogs.map((el, i) => (
                <li key={i} style={{ cursor: 'pointer' }} onClick={() => handleClick(el)}>
                  {el}
                </li>
              ))}
            </ul>
        }
      </div>
    </div>
  );
};

export default Home;

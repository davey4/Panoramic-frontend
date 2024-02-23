import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { __GetAllBreeds } from "../services/ApiClient";

const Home = () => {
  const [dogs, setDogs] = useState([]);
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

  return (
    <div >
      <header>
        <h1>Dogs!</h1>
        <h3>🐾</h3>
      </header>
      {error ? <div>Couldn't load dogs</div> :
        <ul>
          {dogs.map((el, i) => (
            <li key={i} style={{ cursor: 'pointer' }}>
              {<Link to={`/details/${el}`}>{el}</Link>}
            </li>
          ))}
        </ul>}
    </div>
  );
};

export default Home;

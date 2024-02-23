import React from "react";
import { useEffect, useState } from "react";
import { __GetBreedInfo } from "../services/ApiClient";

const Details = (props) => {
  const [breed, setBreed] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    try {
      setError("")
      const breed = props.match.params.breed
      setBreed(breed)
      const data = await __GetBreedInfo(breed);
      setImage(data.message)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div >
      <header>
        <h1>{breed} Details!</h1>
        <h3>🐾</h3>
      </header>
      {error ? <div>Couldn't load {breed} details</div> :
        <img
          src={image}
          alt={breed}
        />}
    </div>
  );
};

export default Details;

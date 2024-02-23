import React from "react";
import { useEffect, useState } from "react";
import { __GetBreedInfo } from "../services/ApiClient";

const Details = (props) => {
  const [breed, setBreed] = useState("");
  const [images, setImages] = useState([]);
  const [displayedImages, setDisplayedImages] = useState([]);
  const [error, setError] = useState("");
  let [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    getDetails();
  }, []);

  const pageSize = 20;

  const getDetails = async () => {
    try {
      setError("")
      const breed = props.match.params.breed
      setBreed(breed)
      const savedBreed = JSON.parse(localStorage.getItem(breed))
      if (savedBreed) {
        setImages(savedBreed)
        return handleImages(savedBreed, currentPage);
      }

      const data = await __GetBreedInfo(breed);
      const breedImages = data.message
      localStorage.setItem(breed, JSON.stringify(breedImages))
      setImages(breedImages)
      return handleImages(breedImages, currentPage)
    } catch (error) {
      setError(error.message)
    }
  }

  const handleImages = (i, p) => {
    const imagesToDisplay = i.filter(function (elt, index) {
      const upperThreshold = p * pageSize;
      const lowerThreshold = p * pageSize - pageSize;
      return index < upperThreshold && index > lowerThreshold;
    });
    if (imagesToDisplay.length < 1) return false;
    setDisplayedImages(imagesToDisplay)
    return true;
  }

  const handlePages = (counter) => {
    const page = currentPage + counter
    if (page === 0) return
    if (handleImages(images, page)) setCurrentPage(page)
    return;
  }

  return (
    <div >
      <header>
        <h1>{breed} Details!</h1>
        <h3>🐾</h3>
      </header>
      {error ? <div>Couldn't load {breed} details</div> :
        <div> {images.length} images
          <button onClick={() => handlePages(-1)}>prev page</button>
          <button onClick={() => handlePages(1)}>next page</button>
          <div>
            {displayedImages.map((el, i) => (
              <img
                key={i}
                src={el}
                alt={breed}
              />
            ))}
          </div>
        </div>
      }
    </div>
  );
};

export default Details;

import axios from "axios";

const ApiClient = axios.create({
  baseURL: "https://dog.ceo/api"
});

export const __GetAllBreeds = async () => {
  try {
    const res = await ApiClient.get("/breeds/list/all");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const __GetBreedInfo = async (breed) => {
  try {
    const res = await ApiClient.get(`breed/${breed}/images/random`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

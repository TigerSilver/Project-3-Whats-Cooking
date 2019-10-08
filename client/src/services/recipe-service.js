import axios from "axios";

const recipeAPI = axios.create({
  baseURL: "/recipes"
});

export const recipeService = ({
  name,
  _addedBy,
  ingredients,
  preparation,
  image,
  meal,
  typeOfFood,
  specifications
}) =>
  new Promise((resolve, reject) => {
    recipeAPI
      .post("/home", {
        name,
        _addedBy,
        ingredients,
        preparation,
        image,
        meal,
        typeOfFood,
        specifications
      })
      .then(response => {
        const recipe = response.data.recipes;
        resolve(recipe);
      })
      .catch(error => {
        console.log("SERVICE ERROR", error);
        reject(error);
      });
  });

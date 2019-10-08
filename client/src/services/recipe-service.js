import axios from "axios";

const recipeAPI = axios.create({
  baseURL: "/"
});

export const listRecipes = () =>
  new Promise((resolve, reject) => {
    recipeAPI
      .get("/recipes")
      .then(response => {
        const recipes = response.data.recipes;
        resolve(recipes);
      })
      .catch(error => {
        console.log("SERVICE ERROR", error);
        reject(error);
      });
  });

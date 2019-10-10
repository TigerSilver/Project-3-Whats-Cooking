import axios from "axios";

const recipeAPI = axios.create({
  baseURL: "/api/recipe"
});

export const addRecipe = data =>
  new Promise((resolve, reject) => {
    const formData = new window.FormData();
    for (let key in data) formData.append(key, data[key]);
    recipeAPI
      .post("/addRecipe", formData)
      .then(response => {
        const newRecipe = response.data;
        resolve(newRecipe);
      })
      .catch(error => {
        console.log("SERVICE ERROR", error);
        reject(error);
      });
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

export const detail = id =>
  new Promise((resolve, reject) => {
    recipeAPI
      .get(`/recipedetail/${id}`) //take out /recipe
      .then(response => {
        const recipe = response.data.recipe;
        resolve(recipe); // need to declare the const of recipe
      })
      .catch(error => {
        console.log("SERVICE ERROR", error);
        reject(error);
      });
  });

export const addedBy = id =>
  new Promise((resolve, reject) => {
    recipeAPI
      .get(`/addedBy/${id}`)
      .then(response => {
        const recipe = response.data.recipes;
        resolve(recipe);
      })
      .catch(error => {
        console.log("SERVICE ERROR", error);
        reject(error);
      });
  });

export const editService = (id, updatedRecipe) =>
  new Promise((resolve, reject) => {
    recipeAPI
      .patch(`/edit/${id}`, updatedRecipe)
      .then(response => {
        const recipe = response.data;
        resolve(recipe);
      })
      .catch(error => {
        reject(error);
      });
  });

import axios from "axios";

const recipeAPI = axios.create({
  baseURL: "/api/recipe"
});

// export const loggedIn = () =>
//   new Promise((resolve, reject) => {
//     authAPI
//       .get("/loggedin")
//       .then(response => {
//         const user = response.data.user;
//         resolve(user);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });

// export const logInService = ({ email, password }) =>
//   new Promise((resolve, reject) => {
//     authAPI
//       .post("/login", { email, password })
//       .then(response => {
//         const user = response.data.user;
//         resolve(user);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });

export const addRecipe = ({
  name,
  ingredients,
  preparation,
  meal,
  typeOfFood,
  specifications
}) =>
  new Promise((resolve, reject) => {
    console.log(
      "SERVICE LOG",
      ingredients,
      preparation,
      meal,
      typeOfFood,
      specifications
    );
    recipeAPI
      .post("/addRecipe", {
        name,
        ingredients,
        preparation,
        meal,
        typeOfFood,
        specifications
      })
      .then(response => {
        const newRecipe = response.data;
        resolve(newRecipe);
        // const recipeAPI = axios.create({
        //   baseURL: "/"
        // });
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

// export const logOutService = () =>
//   new Promise((resolve, reject) => {
//     authAPI
//       .post("/logout")
//       .then(() => {
//         resolve();
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });

// export const editService = ({ username, campus, course }) =>
//   new Promise((resolve, reject) => {
//     authAPI
//       .post("/edit", { username, campus, course })
//       .then(response => {
//         const user = response.data.user;
//         resolve(user);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });

// export const uploadService = data =>
//   new Promise((resolve, reject) => {
//     authAPI
//       .post("/upload", data)
//       .then(response => {
//         const user = response.data.user;
//         resolve(user);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });

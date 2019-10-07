import axios from "axios";

const authAPI = axios.create({
  baseURL: "/auth"
});

export const loggedIn = () =>
  new Promise((resolve, reject) => {
    authAPI
      .get("/loggedin")
      .then(response => {
        const user = response.data.user;
        resolve(user);
      })
      .catch(error => {
        reject(error);
      });
  });

export const logInService = ({ email, password }) =>
  new Promise((resolve, reject) => {
    authAPI
      .post("/login", { email, password })
      .then(response => {
        const user = response.data.user;
        resolve(user);
      })
      .catch(error => {
        reject(error);
      });
  });

export const signUpService = ({
  email,
  password,
  firstName,
  lastName,
  username
}) =>
  new Promise((resolve, reject) => {
    authAPI
      .post("/signup", { email, password, firstName, lastName, username })
      .then(response => {
        const user = response.data.user;
        resolve(user);
      })
      .catch(error => {
        reject(error);
      });
  });

export const logOutService = () =>
  new Promise((resolve, reject) => {
    authAPI
      .post("/logout")
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });

export const editService = ({ username, campus, course }) =>
  new Promise((resolve, reject) => {
    authAPI
      .post("/edit", { username, campus, course })
      .then(response => {
        const user = response.data.user;
        resolve(user);
      })
      .catch(error => {
        reject(error);
      });
  });

export const uploadService = data =>
  new Promise((resolve, reject) => {
    authAPI
      .post("/upload", data)
      .then(response => {
        const user = response.data.user;
        resolve(user);
      })
      .catch(error => {
        reject(error);
      });
  });

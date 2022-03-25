import axios from "axios";

const api = axios.create({
  baseURL: "https://rafa-m.herokuapp.com",
});

export default api;

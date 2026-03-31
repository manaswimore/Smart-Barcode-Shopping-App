import axios from "axios";

const API = axios.create({
  baseURL: "https://groceryapp-backend-wvs5.onrender.com"
});

export default API;

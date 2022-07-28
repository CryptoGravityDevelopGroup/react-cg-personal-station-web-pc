import axios from "axios";

// let baseUrl = "http://13.215.97.243:26888";
let baseUrl = "http://localhost:3000/";
const service = axios.create({
  baseURL: baseUrl,
});

export default service;

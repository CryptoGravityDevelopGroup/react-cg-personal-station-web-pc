import axios from "axios";

let baseUrl = "http://18.144.74.181:26888";
// let baseUrl = "http://localhost:3000/";
const service = axios.create({
  baseURL: baseUrl,
});

export default service;

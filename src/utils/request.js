import axios from "axios";

// let baseUrl = "http://18.144.74.181:26888";
// let baseUrl = "http://localhost:3000/";
let baseUrl = "https://207c1p0569.51mypc.cn/token/list";
const service = axios.create({
  baseURL: baseUrl,
});

export default service;

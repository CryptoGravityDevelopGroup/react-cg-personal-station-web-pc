import request from "../utils/request";

export function registerUser(data) {
  return request({
    url: "/api/users/metamask/nonce",
    method: "POST",
    data,
  });
}

export function login(data) {
  console.log("login", data);
  return request({
    url: "/api/users/metamask/login",
    method: "POST",
    data,
  });
}

// 查看服务态
export function getStatus() {
  return request({
    url: "/api/ping/status",
    method: "GET",
  });
}

// 获取指定账号的token和NFT
export function getUserInfo(data) {
  return request({
    url: "/api/token/find",
    method: "POST",
    data,
  });
}

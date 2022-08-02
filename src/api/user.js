import request from "../utils/request";

export function registerUser(data) {
  return request({
    url: "/users/metamask/nonce",
    method: "POST",
    data,
  });
}

export function login(data) {
  console.log("login", data);
  return request({
    url: "/users/metamask/login",
    method: "POST",
    data,
  });
}

// 查看服务态
export function getStatus() {
  return request({
    url: "/ping/status",
    method: "GET",
  });
}

// 获取指定账号的token和NFT
export function getUserInfo(data) {
  return request({
    url: "/token/list",
    method: "POST",
    data,
  });
}

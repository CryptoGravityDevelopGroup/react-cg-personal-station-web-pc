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
export function getNFTList(data) {
  return request({
    url: "/token/find",
    method: "POST",
    data,
  });
}

// 获取指定账号的token和NFT
export function getTokenList(data) {
  return request({
    url: "/token/list",
    method: "POST",
    data,
  });
}

// 查看服务态
export function getUsersInfo({nickName,walletAddress}) {
  return request({
    url: "/users/info",
    method: "GET",
    params: {
      walletAddress: walletAddress,
      nickName: nickName
    }
  });
}
// 查询昵称是否重复
export function checkoutNickName(nickName) {
  return request({
    url: "/users/exist",
    method: "GET",
    params: {
      nickName: nickName
    }
  });
}
// 编辑用户
export function upDateUsers(data) {
  return request({
    url: "/users/update",
    method: "POST",
    data,
  });
}

// 编辑问题
export function upDateQuestion(data) {
  return request({
    url: "/users/question",
    method: "POST",
    data,
  });
}
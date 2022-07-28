import Web3 from "web3";

let web3 = new Web3(Web3.givenProvider);
// let web3 = new Web3('https://ropsten.infura.io/v3/002d525e2a0f405dbcc3de0c03b7ad30');

// 连接钱包
export async function connectWallte() {
  if (typeof window.ethereum !== "undefined") {
    //监听钱包切换
    window.ethereum.on("accountsChanged", function (accounts) {
      console.log("钱包切换", accounts);
      // window.location.reload();
    });
    //监听链网络改变
    window.ethereum.on("chainChanged", () => {
      console.log("链切换");
      // window.location.reload();
    });

    let addr = await window.ethereum.request({ method: "eth_requestAccounts" }); //授权连接钱包
    console.log("用户钱包地址:", addr[0]);
  } else {
    console.log("未安装钱包插件！");
  }
}
// 获取钱包地址
export function getCurAddress() {
  if (window.ethereum && window.ethereum.selectedAddress) {
    return window.ethereum.selectedAddress;
  } else {
    window.location.pathname = "/";
  }
}
// 签名
export function handleSignMessage(publicAddress, nonce) {
  return new Promise((resolve, reject) =>
    web3.eth.personal.sign(
      web3.utils.fromUtf8(`I am signing my one-time nonce: ${nonce}`),
      publicAddress,
      (err, signature) => {
        if (err) return reject(err);
        return resolve({ publicAddress, signature });
      }
    )
  );
}

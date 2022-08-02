import React, { useState, useEffect } from 'react';

import Header from "../../components/Header/index.tsx";
import style from './index.module.css';
import { getUserInfo } from '../../api/user';

export default function Index() {
  const [tokenList, setTokenList] = useState([]);
  useEffect(() => {
    // 获取Token
    getUserInfo({
      "ethAddress":"0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
      "tokenType":"token"
    }).then((res) => {
      const response = res.data;
      if(response.code === 0) {
        setTokenList(response.data.token.map((item) => {
          return {
            tokenLogo: item.logo,
            tokenName: item.name,
            tokenNum: item.balance / Math.pow(10,item.tokenDecimal),
            tokenPrice:'TODO'
          }
        }));
      }
    });
  }, [])
  
  return (
    <div className={style.wrap}>
      <Header goHomeBtnStatus={true}/>
      <div className={style.tokenDetail}>
        <div className={style.title}>
          Token
        </div>
        <div className={style.detail}>
          <div>共持有12种token，共价值 $TODO</div>
          <div>其中持有最多的是Ethereum 价值$TODO</div>
        </div>
      </div>
      <div className={style.tokenList}>
          {
            tokenList.map((item, index) => {
              return (
                <div className={style.tokenItem} key={index}>
                  <div className={style.tokenLogo}>
                    <img src={item.tokenLogo} alt='tokenLogo' />
                  </div>
                  <div className={style.tokenInfo}>
                    <div className={style.tokenName}>{item.tokenName}</div>
                    <div className={style.tokenNum}>{item.tokenNum}</div>
                    <div className={style.tokenPrice}>{item.tokenPrice}</div>
                  </div>
                </div>
              )
            })
          }
        </div>
    </div>
  )
}

import React, { useState, useEffect } from 'react';

import Header from "../../components/Header/index.tsx";
import style from './index.module.css';
import { getTokenList } from '../../api/user';
import { getCurAddress } from '../../utils/tool';

export default function Index() {
  const [nftList, setNftList] = useState([]);
  const walletAddress = getCurAddress();
  useEffect(() => {
    // 获取Token
    getTokenList({
      "ethAddress": walletAddress,
      "tokenType": "nft"
    }).then((res) => {
      const response = res.data;
      if(response.code === 0) {
        setNftList(response.data.map((item) => {
          return {
            img: item.logo,
            title: item.name,
            price: item.balance / Math.pow(10,item.tokenDecimal),
          }
        }));
      }
    });
  }, []);
  return (
    <div className={style.wrap}>
      <Header goHomeBtnStatus={true}/>
      <div className={style.nftDetail}>
        <div className={style.title}>
          NFT
        </div>
        <div className={style.detail}>
          <div>共持有120个NFT，来自于24个不同项目</div>
          <div>最早2021年10月31日购买第一个nft，购买NFT共计花费24eth。其中xx、xx、xx项目的nft有着良好的市场表现</div>
        </div>
      </div>
      <div className={style.nftList}>
          {
            nftList.map((item,index) => {
              return (
                <div className={style.nftItem} key={index}>
                  <div className={style.nftImage}>
                    <img src={item.img} alt="NFTImage"/>
                  </div>
                  <div className={style.nftInfo}>
                    <div className={style.nftTitle}>{item.title}</div>
                    <div className={style.nftPrice}>{item.price} ETH</div>
                  </div>
                </div>
              )
            })
          }
        </div>
    </div>
  )
}

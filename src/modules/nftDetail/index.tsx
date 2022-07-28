import React from 'react';

import Header from "../../components/Header/index.tsx";
import style from './index.module.css';
import demo1Pic from '../../static/demo-1.png';
import demo2Pic from '../../static/demo-2.png';
import demo3Pic from '../../static/demo-3.png';
import demo4Pic from '../../static/demo-4.png';
import demo5Pic from '../../static/demo-5.png';
import demo6Pic from '../../static/demo-6.png';

export default function Index() {
  const headerPicArr = [
    {
      img:demo1Pic,
      title: 'Community x Community x Community x',
      price: '2.45'
    },{
      img:demo2Pic,
      title: 'Community x Community x Community x',
      price: '2.45'
    },{
      img:demo3Pic,
      title: 'Community x Community x Community x',
      price: '2.45'
    },{
      img:demo4Pic,
      title: 'Community x Community x Community x',
      price: '2.45'
    },{
      img:demo5Pic,
      title: 'Community x Community x Community x',
      price: '2.45'
    },{
      img:demo6Pic,
      title: 'Community x Community x Community x',
      price: '2.45'
    },{
      img:demo3Pic,
      title: 'Community x Community x Community x',
      price: '2.45'
    },{
      img:demo4Pic,
      title: 'Community x Community x Community x',
      price: '2.45'
    },{
      img:demo5Pic,
      title: 'Community x Community x Community x',
      price: '2.45'
    },{
      img:demo6Pic,
      title: 'Community x Community x Community x',
      price: '2.45'
    }
  ]
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
            headerPicArr.map((item,index) => {
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

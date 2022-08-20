import React from 'react';

import Header from "../../components/Header/index.tsx";
import style from './index.module.css';
import { connect } from 'react-redux';

let Index = ({nftList}) =>  {
  return (
    <div className={style.wrap}>
      <Header goHomeBtnStatus={true}/>
      <div className={style.nftDetail}>
        <div className={style.title}>
          NFT
        </div>
        <div className={style.detail}>
          <div>A total of {nftlist.Length} NFTs from XX different projects</div>
          <div>The first NFT was purchased on XX, XXXX at the earliest, and the total cost of purchasing NFT was XXX. Among them, the NFT of XX, XX and XX projects has a good market performance</div>
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
const mapStateToProps = (state) => {
  return {
    nftList: state.nftList
  }
}
export default Index = connect(mapStateToProps, null)(Index);
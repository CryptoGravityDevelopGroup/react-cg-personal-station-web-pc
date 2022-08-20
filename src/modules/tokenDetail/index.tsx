import React from 'react';
import { connect } from 'react-redux';

import Header from "../../components/Header/index.tsx";
import style from './index.module.css';

let Index = ({tokenDetails, tokenList}) => {
  return (
    <div className={style.wrap}>
      <Header goHomeBtnStatus={true}/>
      <div className={style.tokenDetail}>
        <div className={style.title}>
          Token
        </div>
        <div className={style.detail}>
          <div>共持有${tokenList.length}种token，共价值 ${tokenDetails.allTokenVal}</div>
          <div>其中持有最多的是{tokenDetails.MaxTokenItem.tokenName} 价值${tokenDetails.MaxTokenItem.tokenPrice * tokenDetails.MaxTokenItem.tokenNum}</div>
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
function mapStateToProps(state) {
  return {
    tokenList: state.tokenList,
    tokenDetails: state.tokenDetails
  }
}
export default Index = connect(mapStateToProps, null)(Index);

import React from 'react';

import Header from "../../components/Header/index.tsx";
import bitLogo from '../../static/bit-logo.png';
import ethLogo from '../../static/eth-logo.png';
import usdtLogo from '../../static/usdt-logo.png';
import rippleLogo from '../../static/ripple-logo.png';
import style from './index.module.css';

export default function Index() {
  const tokenList = [
    {
      tokenLogo: ethLogo,
      tokenName: 'Ethereum',
      tokenNum: '65.35',
      tokenPrice:'$85,814.75'
    },{
      tokenLogo: bitLogo,
      tokenName: 'Bitcoin',
      tokenNum: '40.08',
      tokenPrice:'$59,080.46'
    },{
      tokenLogo: usdtLogo,
      tokenName: 'Ethereum',
      tokenNum: '65.35',
      tokenPrice:'$30,670.40'
    },{
      tokenLogo: rippleLogo,
      tokenName: 'Ethereum',
      tokenNum: '65.35',
      tokenPrice:'$25,524.54'
    },{
      tokenLogo: ethLogo,
      tokenName: 'Ethereum',
      tokenNum: '65.35',
      tokenPrice:'$85,814.75'
    },{
      tokenLogo: bitLogo,
      tokenName: 'Bitcoin',
      tokenNum: '40.08',
      tokenPrice:'$59,080.46'
    },{
      tokenLogo: usdtLogo,
      tokenName: 'Ethereum',
      tokenNum: '65.35',
      tokenPrice:'$30,670.40'
    },{
      tokenLogo: rippleLogo,
      tokenName: 'Ethereum',
      tokenNum: '65.35',
      tokenPrice:'$25,524.54'
    }
  ];
  return (
    <div className={style.wrap}>
      <Header goHomeBtnStatus={true}/>
      <div className={style.tokenDetail}>
        <div className={style.title}>
          Token
        </div>
        <div className={style.detail}>
          <div>共持有12种token，共价值 $46,764.54</div>
          <div>其中持有最多的是Ethereum 价值$56,345.43</div>
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

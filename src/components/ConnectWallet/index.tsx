import React from 'react';
import style from './index.module.css';

import loadingPic from '../../static/loading.png';

export default function Index(porps) {
  // const { onNext } = porps;
  return (
    <div className={style.connectWallte}>
      <div className={style.loading }>
        <img width={24} height={24} src={loadingPic} alt='loading' />
        <span style={{marginLeft: '8px'}}>等待链接钱包</span>
      </div>
    </div>
  )
}

import React from 'react'

import style from './index.module.css';
import { useNavigate } from "react-router-dom";
import successPic from '../../static/successPic.png';
export default function Index() {
  const navigate = useNavigate();
  return (
    <div className={style.content}>
        <div className={style.successPicWrap}>
          <img src={successPic} alt='successPic' />
        </div>
        <div className={style.title}>搭建完成</div>
        <div className={style.tips}>这是提示这是提示这是提示这是提示这是提示这是提示</div>
        <div className={'button'} onClick={() => {
          navigate('/profile');
        }}>进入主页</div>
    </div>
  )
}

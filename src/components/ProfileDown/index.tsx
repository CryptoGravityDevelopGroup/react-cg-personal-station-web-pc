import React from 'react';
import { Button } from 'antd';
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
        <div className={style.title}>Created</div>
        <div className={style.tips}>Congratulations you have successfully created your web3 identity home page</div>
        <div className='button' onClick={() => {
          navigate('/profile');
        }}>
          <Button size='large' type="primary" shape="round" block htmlType='submit'>
            Go to the home page
          </Button>
        </div>
        {/* <div className={'button'} onClick={() => {
          navigate('/profile');
        }}>Go to the home page</div> */}
    </div>
  )
}

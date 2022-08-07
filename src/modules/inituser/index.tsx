import React, { useState } from 'react'
import Header from "../../components/Header/index.tsx";
import ConnectWallet from "../../components/ConnectWallet/index.tsx";
import InitUserSteps from "../../components/InitUserSteps/index.tsx";
import Profile from "../../components/Profile/index.tsx";
import QuestionAndAnswer from "../../components/QuestionAndAnswer/index.tsx";
import ProfileDown from "../../components/ProfileDown/index.tsx";
import style from './index.module.css';
import { registerUser } from '../../api/user';
import { getCurAddress } from '../../utils/tool';
let userInfo = {};
export default function InitUser() {
  const [curstep, setCurstep] = useState(2);
  // const [userInfo, setuserInfo] = useState({});
  const handleRegisterUser = () => {
    const address = getCurAddress();
    const params = { ...userInfo, "ethAddress": address };
    params.tags = JSON.stringify(params.tags); 
    params.qa = JSON.stringify(params.qa); 
    registerUser(params).then(() => {
      setCurstep(4);
    })
  }
  return (
    <div className={style.inituser}>
      <Header upmStatus={true} />
      <InitUserSteps curstep={curstep} />
      {/* 连接钱包 */}
      {
        curstep === 1 && <ConnectWallet onNext={() => {
          setCurstep(2);
        }}/>
      }

      {/* 个人简介 */}
      {
        curstep === 2 &&(
          <>
            <Profile initFormData = {{
              tags: []
            }} profileDataChange={(obj) => {
              console.log('obj', obj);
              userInfo = { ...obj };
            }}/>
            <div className={style.fromBottom}>
              <div className={'button'} onClick={() => {
                setCurstep(3);
              }}>Next</div>
            </div>
          </>
        )
      }

      {/* Q&A */}
      {
        curstep === 3 && <QuestionAndAnswer onNext={(obj) => {
          userInfo = { ...userInfo, 'qa': obj };
          handleRegisterUser();
        }}/>
      }

      {/* 填写完成 */}
      {
        curstep === 4 && <ProfileDown/>
      }
    </div>
  )
}

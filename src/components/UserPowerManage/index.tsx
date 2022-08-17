import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Button } from "antd";
import html2canvas from 'html2canvas';
import Modal from '../Modal/index.tsx';
import QuestionAndAnswer from "../QuestionAndAnswer/index.tsx";
import { getTokenList, upDateUsers, upDateQuestion, getUsersInfo } from '../../api/user';
import { getCurAddress, logout } from '../../utils/tool';
import Profile from "../../components/Profile/index.tsx";

import upmBtnPic from '../../static/upm-btn.png';
import logoutPic from '../../static/logout.png';
import logoPic from '../../static/logo.png';
import questionPic from '../../static/question.png';
import userProfilePic from '../../static/user-profile.png';
import qrCodePic from '../../static/qrCode.png';
import defaultUserPic from '../../static/default_user.png';
import tokenLinePic from '../../static/token_line.png';
import arrowPic from '../../static/arrow.png';
import ethLogo from '../../static/eth-logo.png';
import demo4 from '../../static/demo-4.png';

import styles from './index.module.css';
export default function Index() {
  let qaList = {};
  const walletAddress = getCurAddress();
  const [menuListStatus, setMenuListStatus] = useState(false);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [isQAModalVisible, setIsQAModalVisible] = useState(false);
  const [isPosterModalVisible, setisPosterModalVisible] = useState(false);
  const posterDom = useRef();
  const [formdata, setFormdata] = useState({
    tags:[],
    qa:[]
  });
  const [initFormData, setInitFormData] = useState({
    tags:[],
    qa:[]
  });
  const menuList = useRef();
 
  useEffect(() => {
    if(menuListStatus) {
      (document.getElementsByTagName('body')[0]).addEventListener('click', (event) => {
        const res = menuList.current.contains(event.target);
        if(!res) {
          setMenuListStatus(false);
        }
      })
    }
  }, [menuListStatus]);

  const editProfile = () => {
    setIsProfileModalVisible(true);
    setMenuListStatus(false);
  }

  const editQA = () => {
    setIsQAModalVisible(true);
    setMenuListStatus(false);
  }
  const showMyQRCode = () => {
    setisPosterModalVisible(true);
    setMenuListStatus(false);
  }
  const handleProfileModalOk = () => {
    formdata.ethAddress = walletAddress;
    formdata.tags = JSON.stringify(formdata.tags);
    formdata.qa = JSON.stringify(formdata.qa);
    upDateUsers({...formdata}).then((res) => {
      console.log('====', res);
      window.location.reload();
    })
    setIsProfileModalVisible(false);
  }
  const handleQAModalOk = () =>{
    qaList.ethAddress = walletAddress;
    qaList.qa = JSON.stringify(qaList.qa);
    upDateQuestion({...qaList}).then((res) => {
      console.log('====', res);
      window.location.reload();
    })
    setIsQAModalVisible(false);
  };
  const handleLogout = () => {
    logout();
  }
  // 保存成png格式的图片
  const saveAsPNG = (canvas) => {
    return canvas.toDataURL("image/png");
  }
  const downLoad = (url) => {
    var oA = document.createElement("a");
    oA.download = '个人海报';// 设置下载的文件名，默认是'下载'
    oA.href = url;
    document.body.appendChild(oA);
    oA.click();
    oA.remove(); // 下载之后把创建的元素删除
}
  const downPoster = () => {
    console.log(posterDom);
    html2canvas(posterDom.current).then(function(canvas) {
      console.log('canvas');
      downLoad(saveAsPNG(canvas))
      // document.body.appendChild(canvas);
    });
  }
  useEffect(() => {
    if(!walletAddress) return;
    // 获取 NFT
    getTokenList({
      "ethAddress": walletAddress,
      "tokenType":"nft"
    }).then((res) => {
      const response = res.data;
      if(response.code === 0) {
        const temp = response.data.map(item => {
          return {
            img: item.logo
          }
        });
        // setInitFormData({...initFormData, })
      }
    });
    // 获取个人信息
    getUsersInfo({walletAddress: walletAddress, nickName: ''}).then((res) => {
      const response = res.data;
      if(response.code === 0) {
        response.data.qa = response.data.qa.length > 0 ? JSON.parse(response.data.qa) : [];
        response.data.tags = response.data.tags.length > 0 ? JSON.parse(response.data.tags) : [];
        setInitFormData(JSON.parse(JSON.stringify(response.data)))
        setFormdata(response.data);
      }
    })
  }, [walletAddress]);

  useEffect(() => {
    let bodyDOM = document.getElementsByTagName('body')[0];
    if(isPosterModalVisible) {
      bodyDOM.style.overflow = 'hidden';
    }
    if(!isPosterModalVisible) {
      bodyDOM.style.overflow = 'auto';
    }
  }, [isPosterModalVisible])
  return (
    <>
      <div className={styles.warp} ref={menuList}>
        <img src={upmBtnPic} alt="upmBtnPic" className={styles.upmBtnPicContent} onClick={() => {
          setMenuListStatus(!menuListStatus);
        }} />
        {
          menuListStatus && 
          <div className={styles.menuList}>
            <div className={styles.menuItem} onClick={() => {
              editProfile();
            }}>
              <div className={styles.itemIcon}>
                <img src={userProfilePic}  alt="userProfilePic"/>
              </div>
              <span className={styles.itemName}>Edit profile</span>
            </div>
            <div className={styles.menuItem} onClick={() => {
              editQA();
            }}>
              <div className={styles.itemIcon}>
                <img src={questionPic}  alt="questionPic"/>
              </div>
              <span className={styles.itemName}>Edit Q&A</span>
            </div>
            <div className={styles.menuItem} onClick={() => {
              showMyQRCode();
            }}>
              <div className={styles.itemIcon}>
                <img src={qrCodePic}  alt="qrCodePic"/>
              </div>
              <span className={styles.itemName}>My QR code</span>
            </div>
            <div className={styles.menuItem} onClick={() => {
              handleLogout();
            }}>
              <div className={styles.itemIcon}>
                <img src={logoutPic}  alt="logoutPic"/>
              </div>
              <span className={styles.itemName}>Quit</span>
            </div>
          </div>
        }
      </div>
      <Modal visible={isProfileModalVisible} title='Edit profile' onClose={() => {
        setIsProfileModalVisible(false);
      }}>
        <div className={styles.useInfoForm}>
          <div className={styles.content}>
            <Profile
            initFormData={initFormData}
            profileDataChange={(obj) => {
              console.log(obj);
              setFormdata({ ...formdata ,...obj });
            }}
            onFinishCallBack={() => {
              handleProfileModalOk();
            }}
            onFinishFailedCallBack={() => {

            }}
            >
              <div className={styles.fromBottom}>
                <div className='button'>
                  <Button type="primary" shape="round" block htmlType='submit'>
                    Ok
                  </Button>
                </div>
              </div>
            </Profile>
          </div>
        </div>
      </Modal>
      <Modal visible={isQAModalVisible} title='Edit Q&A' onClose={() => {
        setIsQAModalVisible(false);
      }}>
        <div className={styles.aqModalContentWarp}>
          <QuestionAndAnswer initQaList={initFormData.qa} isShowDoneBtn={false} callBackFun={(obj) => {
            qaList = { 'qa': obj };
          }}/>
          <div className={styles.fromBottom}>
          <div className='button'>
              <Button size='large' type="primary" shape="round" block htmlType='submit' onClick={() => {
                handleQAModalOk();
              }}>
                Ok
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      {
        isPosterModalVisible === true &&
        ReactDOM.createPortal((
          <>
            <div className={styles.modalMask} onClick={() => {
              setisPosterModalVisible(false);
            }}></div>
            <div ref={posterDom} className={styles.posterModuleWrap}>
              <div className={styles.posterWrap}>
                <div className={styles.posterHeaderWrap}>
                  <img src={logoPic} alt="logoutPic" />
                </div>
                <div className={styles.posterContentWrap}>
                  <div className={styles.userHeadPic}>
                    <img src={defaultUserPic} alt="defaultUserPic" />
                  </div>
                  <div className={styles.userName}>leo zeng</div>
                  <div className={styles.tokenWrap}>
                    <div className={styles.tokenWrapLeft}>
                      <div >Token</div>
                      <img src={tokenLinePic} alt="tokenLinePic" />
                    </div>
                    <img className={styles.arrowPic} src={arrowPic} alt="arrowPic" />
                  </div>
                  <div className={styles.tokenTips}>
                    <span>共持有<span style={{fontSize: '17rem', color: '#454C66'}}>&nbsp;12&nbsp;</span>种token &nbsp;&nbsp; 共价值 <span style={{
                      fontSize: '17rem', color: '#454C66'
                    }}>$46,764.54</span></span>
                  </div>
                  <div className={styles.tokenList}>
                    <div className={styles.toeknItem}>
                      <img src={ethLogo} alt="" />
                      <div className={styles.tokenDetail}>
                        <div className={styles.tokenName}>Ethereum</div>
                        <div className={styles.tokenNum}>x&nbsp;65.35</div>
                        <div className={styles.tokenVal}>$85,814.75</div>
                      </div>
                    </div>
                    <div className={styles.toeknItem}>
                      <img src={ethLogo} alt="" />
                      <div className={styles.tokenDetail}>
                        <div className={styles.tokenName}>Ethereum</div>
                        <div className={styles.tokenNum}>x&nbsp;65.35</div>
                        <div className={styles.tokenVal}>$85,814.75</div>
                      </div>
                    </div>
                    <div className={styles.toeknItem}>
                      <img src={ethLogo} alt="" />
                      <div className={styles.tokenDetail}>
                        <div className={styles.tokenName}>Ethereum</div>
                        <div className={styles.tokenNum}>x&nbsp;65.35</div>
                        <div className={styles.tokenVal}>$85,814.75</div>
                      </div>
                    </div>
                    <div className={styles.toeknItem}>
                      <div className={styles.tokenMoreImg}>
                        more
                      </div>
                      <div className={styles.tokenDetail}>
                        <div className={styles.tokenMoreNum}>
                          +15
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.nftWrap}>
                    <div className={styles.tokenWrapLeft}>
                      <div>NFT</div>
                      <img src={tokenLinePic} alt="tokenLinePic" />
                    </div>
                    <img className={styles.arrowPic} src={arrowPic} alt="arrowPic" />
                  </div>
                  <div className={styles.nftTips}>
                    <span>共持有&nbsp;<span style={{fontSize: '17rem', color: '#454C66'}}>12</span>&nbsp;个NFT &nbsp;&nbsp; 来自于 <span style={{
                      fontSize: '17rem', color: '#454C66'
                    }}>24</span>&nbsp;个不同的项目</span>
                  </div>
                  <div className={styles.nftList}>
                    <img className={styles.nftItem} src={demo4} alt="img"/>
                    <img className={styles.nftItem} src={demo4} alt="img"/>
                    <img className={styles.nftItem} src={demo4} alt="img"/>
                    <img className={styles.nftItem} src={demo4} alt="img"/>
                    <img className={styles.nftItem} src={demo4} alt="img"/>
                    <div className={styles.nftMore}>
                      <div className={styles.nftNum}>+&nbsp;14</div>
                      <div className={styles.nftMoreTips}>more</div>
                    </div>
                  </div>
                </div>
                <div className={styles.posterBottomWrap}>
                  <div className={styles.bottomTips}>扫码进入我的web3身份空间</div>
                  <div className={styles.qrImgWrap}></div>
                </div>
              </div>
              <div className={styles.downPoster} onClick={() => {
                downPoster()
              }}></div>
            </div>
          </>
        ), document.getElementsByTagName('body')[0])
      }
    </>
  )
}

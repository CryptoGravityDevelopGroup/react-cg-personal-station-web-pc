import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import Header from "../../components/Header/index.tsx";
import style from './index.module.css';
import { getTokenList, getUsersInfo } from '../../api/user';
import { getCurAddress } from '../../utils/tool';
import userDefaultPic from '../../static/userDefaultPic.png'
import instagramSolidPic from '../../static/instagram-solid.png';
import telegramSolidPic from '../../static/telegram-solid.png';
import twitterSolidPic from '../../static/twitter-solid.png';
import moreBtn from '../../static/more-btn.png';
// import demo1Pic from '../../static/demo-1.png';
// import demo2Pic from '../../static/demo-2.png';
// import demo3Pic from '../../static/demo-3.png';
// import demo4Pic from '../../static/demo-4.png';
// import demo5Pic from '../../static/demo-5.png';
// import demo6Pic from '../../static/demo-6.png';
import arrowUpPic from '../../static/arrow-up.png';
import arrowDownPic from '../../static/arrow-down.png';

export default function Index() {
  const navigate = useNavigate();
  const walletAddress = getCurAddress();
  const [tokenList, setTokenList] = useState([]);
  const [allTokenVal, setAllTokenVal] = useState(0);
  const [maxTokenVal, setMaxTokenVal] = useState(0);
  const [nftList, setNftList] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [QAList, setQAList] = useState([
    {
      status: false,
      question: 'What is graphic design?',
      answer: "To make your first listing,Design is all around us. It's more than making things pretty. Learn more about what design is and the role it plays in our world today.Design is all around us. It's more than making things pretty. Learn more about what design is and the role it plays in our world today."
    },{
      status: false,
      question: 'Accessibility and inclusion',
      answer: "To make your first listing,Design is all around us. It's more than making things pretty. Learn more about what design is and the role it plays in our world today.Design is all around us. It's more than making things pretty. Learn more about what design is and the role it plays in our world today."
    },{
      status: false,
      question: 'How to connect wallet',
      answer: "To make your first listing,Design is all around us. It's more than making things pretty. Learn more about what design is and the role it plays in our world today.Design is all around us. It's more than making things pretty. Learn more about what design is and the role it plays in our world today."
    }
  ]);
  // const nftListMock = [
  //   {
  //     img:demo1Pic,
  //     title: 'Community x Community x Community x',
  //     price: '2.45'
  //   },{
  //     img:demo2Pic,
  //     title: 'Community x Community x Community x',
  //     price: '2.45'
  //   },{
  //     img:demo3Pic,
  //     title: 'Community x Community x Community x',
  //     price: '2.45'
  //   },{
  //     img:demo4Pic,
  //     title: 'Community x Community x Community x',
  //     price: '2.45'
  //   },{
  //     img:demo5Pic,
  //     title: 'Community x Community x Community x',
  //     price: '2.45'
  //   },{
  //     img:demo6Pic,
  //     title: 'Community x Community x Community x',
  //     price: '2.45'
  //   }
  // ]
  const handleQuestionClick = (index) =>{
    QAList[index].status = !QAList[index].status;
    setQAList([...QAList]);
  }
  const handleUrlClick = (url) => {
    window.open(url);
  }
  useEffect(() => {
    // 获取个人信息
    getUsersInfo({walletAddress: walletAddress, nickName: ''}).then((res) => {
      console.log('getUserInfo', res);
      const response = res.data;
      if(response.code === 0) {
        setUserInfo(response.data);
      }
    })
    // 获取NFT
    getTokenList({
      "ethAddress":"0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
      "tokenType":"nft"
    }).then((res) => {
      const response = res.data;
      if(response.code === 0) {
        let tempArr =response.data.map((item) => {
          return {
            img: item.logo,
            title: item.name,
            price: item.price,
            isValid: item.isValid
          }
        });
        tempArr = tempArr.filter((item) => item.isValid === 1);
        setNftList(tempArr.slice(0, 6));
      }
    });
    // 获取Token
    getTokenList({
      "ethAddress":"0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
      "tokenType":"token"
    }).then((res) => {
      const response = res.data;
      if(response.code === 0) {
        setTokenList(response.data.map((item) => {
          return {
            tokenLogo: item.logo,
            tokenName: item.name,
            tokenNum: item.balance / Math.pow(10,item.tokenDecimal),
            tokenPrice: item.balance / Math.pow(10,item.tokenDecimal)*item.price
          }
        }));
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    let tempAllTokenVal = 0, tempMaxTokenVal  = 0;
    tokenList.forEach(item => {
      tempAllTokenVal = tempAllTokenVal + item.tokenPrice;
      if (item.tokenPrice > tempMaxTokenVal) {
        tempMaxTokenVal = item.tokenPrice;
      } 
    })
    setAllTokenVal(tempAllTokenVal);
    setMaxTokenVal(tempMaxTokenVal);
  }, [tokenList])
  
  return (
    <div>
      <Header upmStatus={true} />
      <div className={style.profileWrap}>
        <div className={style.userHeadPic}>
          <img src={userInfo.avatar} alt='userDefaultPic' />
        </div>
        <div className={style.userName}>
          {userInfo.nickname}
        </div>
        <div className={style.tagWrap}>
          {
            userInfo.tags && userInfo.tags.map((item) => {
              return (
                <div className={style.tagItem}>
                  {item}
                </div>
              )
            })
          }
        </div>
        <div className={style.introduce}>
          <span>{userInfo.brief}</span>
        </div>
        <div className={style.leftSliderList}>
            <div className={style.leftSliderItem}>
              <img width={20} height={20} src={instagramSolidPic} alt="instagramSolidPic" onClick={() => {
                handleUrlClick(userInfo.instagramId);
              }}/>
            </div>
            <div className={style.leftSliderItem}>
              <img width={20} height={20} src={telegramSolidPic} alt="telegramSolidPic" onClick={() => {
                handleUrlClick(userInfo.telegramId);
              }}/>
            </div>
            <div className={style.leftSliderItem}>
              <img width={20} height={20} src={twitterSolidPic} alt="twitterSolidPic" onClick={() => {
                handleUrlClick(userInfo.twitterId);
              }}/>
            </div>
          </div>
      </div>
      <div className={style.tokenWrap}>
        <div className={style.tokenDescribe}>
          <div className={style.profileTitle}>
            Token
          </div>
          <div className={style.describeContent}>
            <div>共持有{tokenList.length}种token，共价值 ${allTokenVal}</div>
            <div>其中持有最多的是Ethereum 价值${maxTokenVal}</div>
          </div>
        </div>
        <div className={style.tokenList}>
          {
            tokenList.slice(0,4).map((item, index) => {
              return (
                <div className={style.tokenItem} key={index}>
                  <div className={style.tokenLogo}>
                    <img src={item.tokenLogo} alt='tokenLogo' />
                  </div>
                  <div className={style.tokenInfo}>
                    <div className={style.tokenName}>{item.tokenName}</div>
                    <div className={style.tokenNum}>{item.tokenNum}</div>
                    <div className={style.tokenPrice}>${item.tokenPrice}</div>
                  </div>
                </div>
              )
            })
          }
          <div className={style.showMoreWrap}  onClick={() => {
            navigate('/tokenDetail');
          }}>
            <img width={24} height={24} src={moreBtn} alt="moreBtn" />
            <div className={style.showMoreContent}>show more</div>
          </div>
        </div>
      </div>
      <div className={style.nftWrap}>
        <div className={style.nftDescribe}>
          <div className={style.nftPlateTitle}>
            NFT
          </div>
          <div className={style.nftDescribeContent}>
            <div>共持有120个NFT，来自于24个不同项目</div>
            <div>最早2021年10月31日购买第一个nft，购买NFT共计花费24eth。其中xx、xx、xx项目的nft有着良好的市场表现</div>
          </div>
          <div className={style.nftShowMore} onClick={() => {
            navigate('/nftDetail');
          }}>
            <div className={style.showMoreContent}>show more</div>
            <img width={18} height={18} src={moreBtn} alt="moreBtn" />
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
      <div className={style.QAWrap}>
        <div className={style.QADescribe}>
          <div className={style.QATitle}>
            Q&A
          </div>
        </div>
        <div className={style.QAList}>
          {
            QAList.map((item, index) => {
              return (
                <div className={style.QAItem} key={index}>
                  <div className={style.question}>
                    <div>{item.question}</div>
                    {
                      item.status ? (
                        <div className={style.arrow} onClick={() => {
                          handleQuestionClick(index);
                        }}>
                          <img src={arrowUpPic} alt='arrowUpPic'/>
                        </div>
                      ) : (
                        <div className={style.arrow} onClick={() => {
                          handleQuestionClick(index);
                        }}>
                          <img src={arrowDownPic} alt='arrowDownPic'/>
                        </div>
                      )
                    }
                  </div>
                  {
                    item.status ? (
                      <div className={style.answer}>{item.answer}</div>
                    ) : ''
                  }
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

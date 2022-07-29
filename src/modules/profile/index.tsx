import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import Header from "../../components/Header/index.tsx";
import style from './index.module.css';
import { getUserInfo } from '../../api/user';
import userDefaultPic from '../../static/userDefaultPic.png'
import instagramSolidPic from '../../static/instagram-solid.png';
import telegramSolidPic from '../../static/telegram-solid.png';
import twitterSolidPic from '../../static/twitter-solid.png';
import bitLogo from '../../static/bit-logo.png';
import ethLogo from '../../static/eth-logo.png';
import usdtLogo from '../../static/usdt-logo.png';
import rippleLogo from '../../static/ripple-logo.png';
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
  const [tokenList, setTokenList] = useState([]);
  const [nftList, setNftList] = useState([]);
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
  const tokenListMock = [
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
    }
  ];
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
  useEffect(() => {
    // 获取NFT
    getUserInfo({
      "ethAddress":"0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
      "tokenType":"nft"
    }).then((res) => {
      const response = res.data;
      if(response.code === 0) {
        setNftList(response.data.token.slice(0, 6));
      }
    });
    // 获取Token
    getUserInfo({
      "ethAddress":"0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
      "tokenType":"token"
    }).then((res) => {
      const response = res.data;
      if(response.code === 0) {
        // setTokenList(response.data.token.slice(0,4));
        setTokenList(tokenListMock);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Header upmStatus={true} />
      <div className={style.profileWrap}>
        <div className={style.userHeadPic}>
          <img src={userDefaultPic} alt='userDefaultPic' />
        </div>
        <div className={style.userName}>
          leo zeng
        </div>
        <div className={style.tagWrap}>
          <div className={style.tagItem}>
            Reporter
          </div>
          <div className={style.tagItem}>
            Blogger
          </div>
          <div className={style.tagItem}>
            Server
          </div>
        </div>
        <div className={style.introduce}>
          <span>Otherdeed is the key to claiming land in Otherside. Each have a unique blend of environment and sediment — some with resources, some home to powerful artifacts. And on a very few, a Koda roams.</span>
        </div>
        <div className={style.leftSliderList}>
            <div className={style.leftSliderItem}>
              <img width={20} height={20} src={instagramSolidPic} alt="instagramSolidPic" />
            </div>
            <div className={style.leftSliderItem}>
              <img width={20} height={20} src={telegramSolidPic} alt="telegramSolidPic" />
            </div>
            <div className={style.leftSliderItem}>
              <img width={20} height={20} src={twitterSolidPic} alt="twitterSolidPic" />
            </div>
          </div>
      </div>
      <div className={style.tokenWrap}>
        <div className={style.tokenDescribe}>
          <div className={style.profileTitle}>
            Token
          </div>
          <div className={style.describeContent}>
            <div>共持有12种token，共价值 $？？？</div>
            <div>其中持有最多的是Ethereum 价值$？？？</div>
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
          <div className={style.showMoreWrap}  onClick={() => {
            navigate.push('/tokenDetail');
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
            navigate.push('/nftDetail');
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

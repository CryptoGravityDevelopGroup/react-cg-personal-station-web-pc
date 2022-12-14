import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import Header from "../../components/Header/index.tsx";
import style from './index.module.css';
import { getTokenList, getUsersInfo } from '../../api/user';
import { getCurAddress } from '../../utils/tool';
import defaultUser from '../../static/default_user.png'
import instagramSolidPic from '../../static/instagram-solid.png';
import telegramSolidPic from '../../static/telegram-solid.png';
import twitterSolidPic from '../../static/twitter-solid.png';
import moreBtn from '../../static/more-btn.png';
import noToken from '../../static/no-token.png';
import noNft from '../../static/no-nft.png';
import noQa from '../../static/no-qa.png';
import arrowUpPic from '../../static/arrow-up.png';
import arrowDownPic from '../../static/arrow-down.png';
import dotPic from '../../static/dot.png';
import { connect } from 'react-redux';

let Index = ({changeUserInfo, changeTokenList, changeNftList, changeTokenDetails}) => {
  const navigate = useNavigate();
  const walletAddress = getCurAddress();
  const [tokenList, setTokenList] = useState([]);
  const [allTokenVal, setAllTokenVal] = useState(0);
  const [maxTokenItem, setMaxTokenItem] = useState({});
  const [nftList, setNftList] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [QAList, setQAList] = useState([]);
  const handleQuestionClick = (index) =>{
    QAList[index].status = !QAList[index].status;
    setQAList([...QAList]);
  }
  const handleUrlClick = (url) => {
    window.open(url);
  }
  useEffect(() => {
    console.log('walletAddress!!!', walletAddress)
    if(!walletAddress) return;
    // 获取个人信息
    getUsersInfo({walletAddress: walletAddress, nickName: ''}).then((res) => {
      const response = res.data;
      if(response.code === 0) {
        response.data.tags = response.data.tags.length > 0 ? JSON.parse(response.data.tags) : [];
        let qaArr = [];
        if(response.data.qa.length > 0 ){
          let tempQaArr = JSON.parse(response.data.qa);
          console.log('tempQaArr', tempQaArr);
          console.log('tempQaArr', typeof(response.data.qa), response.data.qa);
          qaArr = tempQaArr.map((item) => {
            return {
              status: false,
              question: item.question,
              answer: item.answer
            }
          });
        }
        response.data.avatar = response.data.avatar ? response.data.avatar : defaultUser;
        console.log('response.data', response.data);
        setUserInfo(response.data);
        changeUserInfo(response.data);
        setQAList(qaArr);
      }
    })
    // 获取NFT
    getTokenList({
      "ethAddress": walletAddress,
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
        changeNftList(tempArr);
      }
    });
    // 获取Token
    getTokenList({
      "ethAddress":walletAddress,
      "tokenType":"token"
    }).then((res) => {
      const response = res.data;
      if(response.code === 0) {
        let temp = response.data.map((item) => {
          return {
            tokenLogo: item.logo,
            tokenName: item.name,
            tokenNum: item.balance / Math.pow(10,item.tokenDecimal),
            tokenPrice: item.balance / Math.pow(10,item.tokenDecimal)*item.price
          }
        })
        setTokenList(temp);
        changeTokenList(temp);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress]);
  useEffect(() => {
    let tempAllTokenVal = 0, tempMaxTokenVal  = 0, tempMaxToken = {};
    tokenList.forEach(item => {
      tempAllTokenVal = tempAllTokenVal + item.tokenPrice;
      if (item.tokenPrice > tempMaxTokenVal) {
        tempMaxTokenVal = item.tokenPrice;
        tempMaxToken = item;
      } 
    })
    setAllTokenVal(tempAllTokenVal);
    setMaxTokenItem(tempMaxToken);
    changeTokenDetails({
      allTokenVal: tempAllTokenVal,
      MaxTokenItem: tempMaxToken
    })
  }, [tokenList])
  
  return (
    <div className={style.contentWrap}>
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
            userInfo.tags && userInfo.tags.map((item, index) => {
              return (
                <div key={index} className={style.tagItem}>
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
          <img className={style.dotPic} src={dotPic} alt="" />
          <div className={style.profileTitle}>
            Token
          </div>
          {
            tokenList.length !== 0 && (
              <div className={style.describeContent}>
                <div>A total of {tokenList.length} tokens are held, with a total value of ${allTokenVal}</div>
                <div>Among them, the most held is {maxTokenItem.tokenName} value ${maxTokenItem.tokenNum * maxTokenItem.tokenPrice}</div>
              </div>
            )
          }
        </div>
        <div>
          {
            tokenList.length !== 0 && (<div className={style.tokenList}>
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
            </div>)
          }
        </div>
        {
          tokenList.length === 0 && (
            <div className={style.noData}>
              <img className={style.noDataImg} src={noToken} alt="noTokens" />
              <div className={style.noDataTips}>no Token</div>
            </div>
          )
        }
      </div>
      <div className={style.nftWrap}>
        <div className={style.nftDescribe}>
          <img className={style.dotPic} src={dotPic} alt="" />
          <div className={style.nftPlateTitle}>
            NFT
          </div>
          {
            nftList.length !== 0 && (
              <>
                <div className={style.nftDescribeContent}>
                  <div>A total of {nftList.length} NFTs from XX different projects</div>
                  <div>The first NFT was purchased on XX, XXXX at the earliest, and the total cost of purchasing NFT was XXX. Among them, the NFT of XX, XX and XX projects has a good market performance</div>
                </div>
                <div className={style.nftShowMore} onClick={() => {
                  navigate('/nftDetail');
                }}>
                  <div className={style.showMoreContent}>show more</div>
                  <img width={18} height={18} src={moreBtn} alt="moreBtn" />
                </div>
              </>
            )
          }
        </div>
        {
          nftList.length !== 0 && (
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
          )
        }
      </div>
      {
        nftList.length === 0 && (
          <div className={style.noData}>
            <img className={style.noDataImg} src={noNft} alt="noNft" />
            <div className={style.noDataTips}>no NFT</div>
          </div>
        )
      }
      <div className={style.QAWrap}>
        <div className={style.QADescribe}>
          <img className={style.dotPic} src={dotPic} alt="" />
          <div className={style.QATitle}>
            Q&A
          </div>
        </div>
        {
          QAList.length !== 0 && (
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
        )
        }
        {
          QAList.length === 0 && (
            <div className={style.noData}>
              <img className={style.noDataImg} src={noQa} alt="noQa" />
              <div className={style.noDataTips}>no Q&A</div>
            </div>
          )
        }
      </div>
    </div>
  )
}
const mapDispatchToProps = (dispatch) => {
  return {
    changeUserInfo: (value) => {
      dispatch({type: 'CHANGE_USER_INFO', value})
    },
    changeTokenList: (value) => {
      dispatch({type: 'CHANGE_TOKEN_LIST', value})
    },
    changeTokenDetails: (value) => {
      dispatch({type: 'CHANGE_TOKEN_DETAILS', value})
    },
    changeNftList: (value) => {
      dispatch({type: 'CHANGE_NFT_LIST', value})
    },
    changeNftDetails: (value) => {
      dispatch({type: 'CHANGE_NFT_DETAILS', value})
    }
  }
}
export default Index = connect(null, mapDispatchToProps)(Index);
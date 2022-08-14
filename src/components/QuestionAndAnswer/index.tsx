import React, { useEffect, useState } from 'react';
import { Input, Button } from 'antd';
import style from './index.module.css';
import deleteBtnPic from '../../static/delete-btn.png'
import addBtnPic from '../../static/add-btn.png'

export default function Index(props) {
  const { onNext, isShowDoneBtn, callBackFun, initQaList } = props;
  const { TextArea } = Input;
  const [questionList, setQuestionList] = useState(() => {
    if(initQaList && initQaList.lenght > 0) {
      return [...initQaList];
    }
    return [
      {
        question: '',
        answer:''
      }
    ]
  });
  const deleteQuestion = (index) => {
    questionList.splice(index,1);
    setQuestionList([...questionList]);
  }
  const addQuestion = () => {
    questionList.push({
      question:'',
      answer:''
    })
    setQuestionList([...questionList]);
  }
  useEffect(() => {
    callBackFun && callBackFun(JSON.stringify(questionList));
  },[questionList]);
  return (
    <>
      <div className={style.wrap}>
        {
          questionList.map((item, index) => {
            return (
              <div key={index} className={style.qaItem}>
                <div className={style.deletBtn} onClick={() => {
                  deleteQuestion();
                }}>
                  <img src={deleteBtnPic} alt='deleteBtnPic'/>
                </div>
                <div className={style.title}>
                  question {index + 1}
                </div>
                <Input value={item.question} showCount maxLength={100} style={{marginBottom: '24px',}} onChange={(event) => {
                  item.question = event.target.value;
                  setQuestionList([...questionList]);
                }}/>
                <div className={style.title}>
                  answer
                </div>
                <TextArea value={item.answer} className={style.answerContent} showCount maxLength={500}  placeholder="Enter your Answer" autoSize={{ minRows: 4, maxRows: 4 }} onChange={(event) => {
                  item.answer = event.target.value;
                  setQuestionList([...questionList]);
                }} />
              </div>
            )
          })
        }
        <div className={style.addQuestion} onClick={() => {
            addQuestion()
          }}>
          <div className={style.addBtnPic}>
            <img src={addBtnPic} alt='addBtnPic'/>
          </div>
          <span className={style.addContent}>add</span>
        </div>
        
        {
          isShowDoneBtn === false ? "" : (
            <div className='button' onClick={() => {
              onNext(questionList);
            }}>
              <Button size='large' type="primary" shape="round" block htmlType='submit'>
                Done
              </Button>
            </div>
          )
        }
      </div>
    </>
  )
}

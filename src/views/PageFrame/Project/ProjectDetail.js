import React, { useEffect, useState } from 'react'
import {  Redirect, Route, Switch, useHistory, useLocation, useParams } from 'react-router'
import { Input, Form} from 'antd';
import {
  CloseOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

import style from './ProjectDetail.module.scss'
import ItemTable from './components/ItemTable';
import ProgressPage from './components/ProgressPage';
import Notice from './components/Notice';
import api from '@/utils/api';

export default function ProjectDetail() {
  const history = useHistory()
  const {id, name} = useParams()
  const [notice, setNotice] = useState('')
  const [noticeDisplay, setNoticeDisplay] = useState(true)
  useEffect(() => {
    api.getNotice({
      projectID:id,
      token:localStorage.getItem('token')
    })
    .then((res)=>{
      console.log(res);
      setNotice(res.content)
    })
  }, [])  

  
  function commitNotice(e){
    api.writeNotice({
      content:e.target.value,
      user_OakCode:localStorage.getItem('oakCode'),
      projectID:id,
      token:localStorage.getItem('token')
    })
    .then(()=>{
      history.go(0)
    })
  }
  
  return (
    <>
      <div className={style.header}>
        <div className={style.left}>
          <div className={style.teamName}>{name}</div>
          <div className={style.notice}
            onClick={function(){
              setNoticeDisplay(false)
            }}
            style={{display:`${noticeDisplay?'':"none"}`}}
          >
            {
              notice===""?'填写工作签名':notice
            }
          </div>
          <Input 
            className={style.input}
            style={{display:`${noticeDisplay?'none':''}`}}
            width={300}
            placeholder='按下回车以确认'
            onPressEnter={commitNotice}
            suffix={
              <CloseOutlined 
                onClick={
                function(){
                  setNoticeDisplay(true)
                }}
                style={{cursor:'pointer'}}
              >
              </CloseOutlined>
            }
          >
          </Input>
          <div className={style.menu}>
            <Link className={style.menuItem} to={`/ProjectDetail/${id}/${name}/list`}>列表</Link>
            <Link className={style.menuItem} to={`/ProjectDetail/${id}/${name}/progress`}>进展</Link>
            {/* <Link className={style.menuItem} to={`/ProjectDetail/${id}/${name}/notice`}>公告</Link> */}
          </div>
        </div>
      </div>
      <div className={style.content}>
        <Switch>
          <Route path={'/ProjectDetail/:id/:name/list'}>
            <ItemTable/>
          </Route>
          <Route path={'/ProjectDetail/:id/:name/progress'}>
            <ProgressPage/>
          </Route>
          <Route path={'/ProjectDetail/:id/:name/notice'}>
            <Notice/>
          </Route>
          <Redirect to={'/ProjectDetail/:id/:name/list'}/>
        </Switch>
      </div>
    </>
  )
}



//暂时不用的头像组 组件
        {/* <div className={style.right}>
          <Avatar.Group>
            {
              member.map((item)=>{
                return <Avatar src={item.avatar}/>
              })
            }
          </Avatar.Group>
        </div> */}
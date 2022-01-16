import React, { useEffect, useState } from 'react'
import {  Redirect, Route, Switch, useHistory, useParams } from 'react-router'
import { Input, Modal} from 'antd';
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
  const [modalDisplay, setModalDisplay] = useState(false)
  const [noticeDisplay, setNoticeDisplay] = useState(true)
  useEffect(() => {
    api.getNotice({
      projectID:id,
      token:sessionStorage.getItem('token')
    })
    .then((res)=>{
      console.log(res);
      setNotice(res.content)
    })
  }, [])  

  
  function commitNotice(e){
    api.writeNotice({
      content:e.target.value,
      user_OakCode:sessionStorage.getItem('oakCode'),
      projectID:id,
      token:sessionStorage.getItem('token')
    })
    .then(()=>{
      history.go(0)
    })
  }
  
  function handleModalOk(){
    api.deleteProject({
      token:sessionStorage.getItem('token'),
      projectID:id
    })
    .then(()=>{
      history.push('/Project')
    })
  }
  function handleModalCancel(){
    setModalDisplay(false)
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
              notice===""?'填写项目公告':notice
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
            <span className={style.menuDel} onClick={function(){setModalDisplay(true)}}>删除</span>
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
      <Modal 
        title="警告"
        visible={modalDisplay} 
        onOk={handleModalOk} 
        onCancel={handleModalCancel}
      >
        该项目所有的内容都将被删除，确认删除该项目吗？
      </Modal>
    </>
  )
}


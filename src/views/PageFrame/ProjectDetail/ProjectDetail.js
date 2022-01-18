import React, { useEffect, useState } from 'react'
import {  Redirect, Route, useNavigate, useParams, Outlet } from 'react-router-dom'
import { Input, message, Modal} from 'antd';
import {
  CloseOutlined,
} from '@ant-design/icons';

import { Link } from 'react-router-dom';

import style from './ProjectDetail.module.scss'
import api from '@/utils/api';

export default function ProjectDetail() {
  const navigate = useNavigate()
  const {id, name} = useParams()
  const [notice, setNotice] = useState('')
  const [modalDisplay, setModalDisplay] = useState(false)
  const [noticeDisplay, setNoticeDisplay] = useState(true)

  function getNotice(){
    api.getNotice({
      projectID:id,
      token:sessionStorage.getItem('token')
    })
    .then((res)=>{
      if(res.notice){
        setNotice(res.content)
      }
    })
    .catch(err=>{
      message.error(err)
    })
  }

  useEffect(() => {
    getNotice()
  }, [])  

  
  function commitNotice(e){
    api.writeNotice({
      content:e.target.value,
      user_OakCode:sessionStorage.getItem('oakCode'),
      projectID:id,
      token:sessionStorage.getItem('token')
    })
    .then(()=>{
      getNotice()
    })
    .catch(err=>{
      message.error(err)
    })
  }
  
  function handleModalOk(){
    api.deleteProject({
      token:sessionStorage.getItem('token'),
      projectID:id
    })
    .then(()=>{
      navigate('/Project')
    })
    .catch(err=>{
      message.error(err)
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
        <Outlet></Outlet>
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


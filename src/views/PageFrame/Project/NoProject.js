import React from 'react'
import style from './NoProject.module.scss'
import {
  FolderAddOutlined
} from '@ant-design/icons';
import { useHistory } from 'react-router';
export default function NoProject() {
  let history = useHistory()
  function toCreatProjectPage(){
    history.push('/CreateProject')
    console.log(1);
  }
  return (
    <div className={style.container}>
      <div className={style.smallText}>{localStorage.name}，欢迎来到Oak</div>
      <div className={style.bigText}>点击下方创建新项目，开启您的第一个项目</div>
      <div className={style.btn} onClick={toCreatProjectPage}>
        <FolderAddOutlined className={style.icon}/>
        <div className={style.tips}>创建新项目</div>
      </div>
    </div>
  )
}

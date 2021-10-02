import React from 'react'
import style from './NoProject.module.scss'
import {
  FolderAddOutlined
} from '@ant-design/icons';
export default function NoProject() {
  return (
    <div className={style.container}>
      <div className={style.smallText}>臭宝，欢迎来到Oak</div>
      <div className={style.bigText}>点击下方创建新项目，开启您的第一个项目</div>
      <div className={style.btn}>
        <FolderAddOutlined className={style.icon}/>
        <div className={style.tips}>创建新项目</div>
      </div>
    </div>
  )
}

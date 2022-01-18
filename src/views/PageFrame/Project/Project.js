import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { message, Spin } from 'antd';
import {
  FolderAddOutlined,
  FolderOutlined
} from '@ant-design/icons';

import style from './Project.module.scss'
import NoProject from './NoProject/NoProject'
import api from '@/utils/api'
export default function Project() {
  const navigate = useNavigate()
  const [spin, setSpin] = useState(true)
  let selectedTeam = useSelector(state => state.selectedTeam)
  const [projects, setProjects] = useState([1])
  useEffect(() => {
    setSpin(true)
    api.getProject({
      token: sessionStorage.getItem('token'),
      teamName: selectedTeam
    })
      .then((res) => {
        setProjects(res.projects)
        setSpin(false)
      })
      .catch(err => {
        message.error(err)
      })
  }, [selectedTeam])

  function toCreatProjectPage() {
    navigate('/CreateProject')
  }

  
  function renderBox() {
    if (projects[0] === 1) {
      return <div></div>
    }
    else if (projects.length === 0) {
      return <NoProject />
    }
    else {
      return <div className={style.hasProjectBox}>
        {
          projects.map((item) => {
            return <div className={style.projectItem}
              onClick={function () {
                navigate(`/ProjectDetail/${item.id}/${item.name}/list`)
              }}
              key={item.id}
            >
              <FolderOutlined className={style.icon} />
              <div className={style.tips} >{item.name}</div>
            </div>
          })

        }
        <div className={style.projectItem} onClick={toCreatProjectPage}>
          <FolderAddOutlined className={style.icon} />
          <div className={style.tips}>创建新项目</div>
        </div>
      </div>
    }

  }

  return (
    <div className={style.container}>
      <div className={style.box}>
        <div className={style.spinContainer} style={{ display: spin ? '' : 'none' }}>
          <Spin spinning={spin} size='large'></Spin>
        </div>
        {
          spin?<div/>:renderBox()
        }
      </div>
    </div>
  )
}

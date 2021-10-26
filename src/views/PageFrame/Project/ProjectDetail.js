import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch, useLocation, useParams } from 'react-router'
// import { Avatar } from 'antd';
import { Link } from 'react-router-dom';

import style from './ProjectDetail.module.scss'
import ItemTable from './components/ItemTable';
import ProgressPage from './components/ProgressPage';
import Notice from './components/Notice';

export default function ProjectDetail() {
  const {id, name} = useParams()
  return (
    <>
      <div className={style.header}>
        <div className={style.left}>
          <div className={style.teamName}>{name}</div>
          <div className={style.menu}>
            <Link className={style.menuItem} to={`/ProjectDetail/${id}/${name}/list`}>列表</Link>
            <Link className={style.menuItem} to={`/ProjectDetail/${id}/${name}/progress`}>进展</Link>
            <Link className={style.menuItem} to={`/ProjectDetail/${id}/${name}/notice`}>公告</Link>
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
import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch, useLocation, useParams } from 'react-router'
// import { Avatar } from 'antd';
import { Link } from 'react-router-dom';

import api from '@/utils/api'
import style from './ProjectDetail.module.scss'
import { useSelector } from 'react-redux'
import ItemTable from './components/ItemTable';

export default function ProjectDetail() {
  let location = useLocation()
  let selectedTeam =  useSelector(state=>state.selectedTeam)
  const {id, name} = useParams()
  // const [member, setMember] = useState([])
  // useEffect(() => {
  //   api.getMembers({
  //     token:localStorage.getItem('token'),
  //     teamName:selectedTeam,
  //   })
  //   .then((res)=>{
  //     setMember(res.member)
  //   })
  // }, [])
  return (
    <>
      <div className={style.header}>
        <div className={style.left}>
          <div className={style.teamName}>{name}</div>
          <div className={style.menu}>
            <Link className={style.menuItem} to={location.pathname+'/list'}>列表</Link>
            <Link className={style.menuItem} to={location.pathname+'/list'}>进展</Link>
            <Link className={style.menuItem} to={location.pathname+'/list'}>公告</Link>
          </div>
        </div>
      </div>
      <div className={style.content}>
        <Switch>
          <Route path={'/ProjectDetail/'+id+'/'+name+'/list'}>
            <ItemTable/>
          </Route>
          <Redirect to={'/ProjectDetail/'+id+'/'+name+'/list'}/>
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
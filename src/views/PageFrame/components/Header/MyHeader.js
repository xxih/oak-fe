import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { Menu,Dropdown,Avatar,Layout  } from 'antd';

import { DownOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { switchTeamAction } from '@/redux';
import api from '@/utils/api'

import style from './MyHeader.module.scss'

const {  Header } = Layout;

export default function MyHeader() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  //登录的时候已经 dispatch switchTeam，这里直接获取
  let selectedTeam = useSelector(state=>state.selectedTeam)
  const [team, setTeam] = useState([])
  //登录后进入主页面就获取团队信息
  useEffect(() => {
    let res = api.getTeam({
      token:sessionStorage.getItem('token'),
      oakCode:sessionStorage.getItem('oakCode')
    });
    res.then((data)=>{
      setTeam(data.team)
    })
  }, [])

  const menu = (
    <Menu>
      <Menu.ItemGroup title={`切换团队`} style={{width:150}}>
        <Menu.Divider />
        {
          team.map(item=>{
            return (<Menu.Item 
              key={item} 
              onClick={switchTeam}
            >
              <div>
                {item}
              </div>
            </Menu.Item>)
          })
        }
      </Menu.ItemGroup>
      <Menu.Divider />
      <Menu.Item 
        key="createNewTeam"
        onClick={goCreateTeamPage}
      >
          新建团队
      </Menu.Item>
    </Menu>
  );
  
  function switchTeam(item){
    dispatch(switchTeamAction(item.key))
    navigate('/Project')
  }

  function goCreateTeamPage(){
    navigate('/CreateTeam')
  }

  const avatarMenu = (
    <Menu>
      <Menu.Item onClick={goMinePage} key="goMinePage">
        个人中心
      </Menu.Item>
      <Menu.Item onClick={goChangePassword} key="goChangePassword">
        修改密码
      </Menu.Item>
      <Menu.Item onClick={logOut} key="logout">
        退出登录
      </Menu.Item>
    </Menu>
  )

  function goMinePage(){
    navigate('/Mine')
  }

  function goChangePassword(){
    navigate('/ChangePassword')
  }

  function logOut(){
    sessionStorage.clear()
    navigate('/Login')
  }
  
  function switchMenu(e){
    navigate(e.key)
  }


  return (
    <>
      <Header className={style.header}>
        <Dropdown overlay={menu} className={style.team}>
          <a  href=" " onClick={e => e.preventDefault()}>
            {selectedTeam}
            <DownOutlined />
          </a>
        </Dropdown>
        <Menu 
          onClick={switchMenu} 
          selectedKeys={location.pathname.split('/')[1]==='ProjectDetail'?'/Project':location.pathname} 
          mode="horizontal" 
          className={style.menu}
        >
          <Menu.Item key="/Project">
            项目
          </Menu.Item>
          <Menu.Item key="/Team" >
            团队
          </Menu.Item>
          <Menu.Item key="/Mine">
            我自己
          </Menu.Item>
        </Menu>
        <Dropdown overlay={avatarMenu} className={style.avatar}>
          <Avatar  size="large"
          //  icon={<UserOutlined />} 
            src={sessionStorage.getItem('avatar')}
            style={{cursor:"pointer",marginTop:"10px"}}
          />
        </Dropdown>
      </Header>
    </>
  )
}

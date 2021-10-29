import React, { useEffect, useState } from 'react'
import {Route,Switch,useHistory,useLocation,Redirect} from 'react-router-dom'
import { Menu,Layout,Dropdown,Avatar  } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { switchTeamAction } from '@/redux';


import style from './PageFrame.module.scss'
import Project from './Project/Project.js'
import Team from './Team/Team.js'
import Mine from './Mine/Mine.js'
import ProjectDetail from './Project/ProjectDetail';
import api from '@/utils/api'
const { Header, Content,Footer  } = Layout;

export default function PageFrame() {

  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  let selectedTeam = useSelector(state=>state.selectedTeam)
  const [team, setTeam] = useState([])
  useEffect(() => {
    let res = api.getTeam({
      token:localStorage.getItem('token'),
      oakCode:localStorage.getItem('oakCode')
    });
    res.then((data)=>{
      setTeam(data.team)
    })
  }, [])

  function switchTeam(item){
    dispatch(switchTeamAction(item.key))
    localStorage.setItem('selectedTeam',item.key)
    history.push('/Project')
  }
  
  function goCreateTeamPage(){
    history.push('/CreateTeam')
  }

  function goMinePage(){
    history.push('/Mine')
  }

  function goChangePassword(){
    history.push('/ChangePassword')
  }

  const menu = (
    <Menu>
      <Menu.ItemGroup title={`切换团队`} style={{width:150}}>
        <Menu.Divider />
        {
          team.map((item)=>{
            return (<
              Menu.Item key={item}
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

  const logOutMenu = (
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

  function logOut(){
    localStorage.clear()
    history.push('/Login')
  }

  function switchMenu(e){
    history.push(e.key)
  }
  return (
    <Layout className={style.layout}>
      <Header className={style.header}>
        <Dropdown overlay={menu} className={style.team}>
          <a  href=" " onClick={e => e.preventDefault()}>
            {selectedTeam}
            <DownOutlined />
          </a>
        </Dropdown>
        <Menu 
        onClick={switchMenu} 
        selectedKeys={location.pathname} 
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
        <Dropdown overlay={logOutMenu} className={style.avatar}>
          <Avatar  size="large"
          //  icon={<UserOutlined />} 
            src={localStorage.avatar}
            style={{cursor:"pointer",marginTop:"10px"}}
          />
        </Dropdown>
      </Header>

      <Content className={style.content}>
        <Switch>
          <Route path="/Project">
            <Project></Project>
          </Route>
          <Route path="/Team">
            <Team></Team>
          </Route>
          <Route path="/Mine">
            <Mine></Mine>
          </Route>
          <Route path="/ProjectDetail/:id/:name">
            <ProjectDetail></ProjectDetail>
          </Route>
          <Redirect to="/Project" />
        </Switch>
      </Content>
      <Footer className={style.footer}>Oak ©2021 Created by CV-G</Footer>
    </Layout>
  )
}

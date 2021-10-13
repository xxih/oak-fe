import React from 'react'
import {Route,Switch,useHistory,useLocation,Redirect} from 'react-router-dom'
import { Menu,Layout,Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import style from './PageFrame.module.scss'
import Project from './Project/Project.js'
import Team from './Team/Team.js'
import Mine from './Mine/Mine.js'
const { Header, Content,Footer  } = Layout;

export default function PageFrame() {
  const history = useHistory()
  const location = useLocation()

  const menu = (
    <Menu>
      <Menu.ItemGroup title={`切换团队`} style={{width:150}}>
        <Menu.Divider />
        <Menu.Item key="0">
          <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            团队一
          </a>
        </Menu.Item>
        <Menu.Item key="1">
          <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
            团队二
          </a>
        </Menu.Item>
        <Menu.Item key="3">
          团队三
        </Menu.Item>
      </Menu.ItemGroup>
      <Menu.Divider />
      <Menu.Item key="4">
          新建团队
      </Menu.Item>
    </Menu>
  );
  function handleClick(e){
    history.push(e.key)
    console.log(location);
  }
  return (
    <Layout className={style.layout}>
      <Header className={style.header}>
        <Dropdown overlay={menu} className={style.team}>
          <a  href=" " onClick={e => e.preventDefault()}>
            CV小队
            <DownOutlined />
          </a>
        </Dropdown>
        <Menu 
        onClick={handleClick} 
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
      </Header>
      <Content className={style.content}>
        <Switch>
          <Route path="/Project">
            <Project></Project>
          </Route>
          <Route path="/Team">
            <Team></Team>
          </Route>
          <Route path="/Mine" component={Mine}>
          </Route>
          <Redirect to="/Project" />
        </Switch>
      </Content>
      <Footer className={style.footer}>Oak ©2021 Created by CV-G</Footer>
    </Layout>
  )
}

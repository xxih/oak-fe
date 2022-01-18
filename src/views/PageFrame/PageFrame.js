import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout} from 'antd';

import MyHeader from './components/Header/MyHeader.js';

import style from './PageFrame.module.scss'

const {  Content, Footer } = Layout;

export default function PageFrame() {

  return (
    <Layout className={style.layout}>
      <MyHeader></MyHeader>
      <Content className={style.content}>
        <Outlet/>
      </Content>
      <Footer className={style.footer}>Oak ©2021 Created by CV-G</Footer>
    </Layout>
  )
}

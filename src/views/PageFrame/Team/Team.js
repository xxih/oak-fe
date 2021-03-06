import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Avatar, Tag, Button, Modal, Form, message, Input, Select, Spin } from 'antd';

import style from './Team.module.scss'
import api from '@/utils/api';

const { Option } = Select


export default function Team() {
  let selectedTeam = useSelector(state => state.selectedTeam)
  const [spin, setSpin] = useState(true)
  const [members, setMembers] = useState([])
  const [visible, setVisible] = useState(false);
  const [membersNum, setMembersNum] = useState(0)
  useEffect(() => {
    api.getMembers({
      teamName: selectedTeam,
      token: sessionStorage.getItem('token')
    })
      .then((res) => {
        setMembers(res.member)
        setSpin(false)
      })
      .catch(err => {
        message.error(err)
      })
  }, [])

  useEffect(() => {
    setMembersNum(members.length)
  }, [members])
  const [form] = Form.useForm()

  const handleOk = () => {
    let { duty, oakCode } = form.getFieldValue()
    api.inviteMember({
      oakCode,
      teamName: selectedTeam,
      duty,
      token: sessionStorage.getItem('token')
    })
      .then(() => {
        message.success('邀请成功！')
        api.getMembers({
          teamName: selectedTeam,
          token: sessionStorage.getItem('token')
        })
          .then((res) => {
            setMembers(res.member)
          })
          .catch(err => {
            message.error(err)
          })
      })
      .catch(err => {
        message.error(err)
      })
  }

  return (
    <div className={style.container}>
      <div className={style.box}>
        <div className={style.spinContainer} style={{ display: spin ? '' : 'none' }}>
          <Spin spinning={spin} size='large'></Spin>
        </div>
        <div className={style.header} style={{display:spin?'none':''}}>
          <div className={style.btn}>所有成员</div>
        </div>
        <div className={style.bar} style={{display:spin?'none':''}}>
          <div className={style.groupName}>{selectedTeam}</div>
          <div className={style.num}>
            （共{
              membersNum
            }人）
          </div>
          <Button className={style.inviteBtn}
            onClick={function () {
              setVisible(true)
            }}
          >邀请新成员</Button>
        </div>
        <div className={style.list} style={{display:spin?'none':''}}>
          {
            members.map(item => {
              return <div className={style.item}
                key={item.OakCode}
              >
                <Avatar className={style.icon} size={30} src={item.avatar}></Avatar>
                <div className={style.name}>{item.name}</div>
                <Tag className={style.tag} color="#55acee">{item.Duty
                }</Tag>
              </div>
            })
          }
        </div>
      </div>
      <Modal visible={visible}
        onOk={handleOk}
        onCancel={function () {
          setVisible(false)
        }}
        className={style.modal}
        width={400}
      >
        <div className={style.modalTitle}>
          邀请新成员
        </div>
        <Form
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 13 }}
          className={style.form}
          form={form}
          requiredMark={false}
        >
          <Form.Item
            label="橡木码"
            name="oakCode"
            rules={[{ required: true }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="身份"
            name="duty"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="leader">超级管理员</Option>
              <Option value="admin">管理员</Option>
              <Option value="member">成员</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { Button, Modal, Form, Input, DatePicker, Radio, Select, Table } from 'antd'
import moment from 'moment';

import api from '@/utils/api';
import style from './ItemTable.module.scss'

const { RangePicker } = DatePicker
const { Option } = Select
const { TextArea } = Input

const columns = [
  {
    title: '任务标题',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '优先级',
    dataIndex: 'priority',
    key: 'priority',
  },
  {
    title: '负责人',
    dataIndex: 'user_name',
    key: 'user_name',
  },
  {
    title: '结束时间',
    dataIndex: 'end_date',
    key: 'end_date',
  },
];

export default function ItemTable() {
  const {id, name} = useParams()
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false);
  const [members, setMembers] = useState([])
  const [missions, setMissions] = useState([])
  const selectedTeam = useSelector(state => state.selectedTeam)
  useEffect(() => {
    api.getMembers({
      teamName:selectedTeam,
      token:localStorage.getItem('token')
    })
    .then((res)=>{
      setMembers(res.member)
    })
  }, [])

  useEffect(() => {
    api.getMission({projectID:id,token:localStorage.getItem('token')})
    .then((res)=>{
      if(res.mission.length>0&&members.length>0){
        let tempMissions = res.mission.map((missionItem)=>{
          let temp = members.find((membersItem)=>{
            return membersItem.OakCode===missionItem.user_OakCode
          })
          return{
            ...missionItem,
            user_name:temp.name,
            key:missionItem.id
          }
        })
        setMissions(tempMissions)
      }
    })
    
  }, [members])
  
  const showModal = ()=>{
    setVisible(true)
  }
  const handleOk = ()=>{
    let {missionName, priority, date, user_OakCode, description} = form.getFieldValue()
    let startDate = date[0].format('YYYY-MM-DD')
    let endDate = date[1].format('YYYY-MM-DD')
    let projectID = id
    let token = localStorage.getItem('token')
    api.createMission({
      missionName,
      startDate,
      endDate,
      projectID,
      user_OakCode,
      priority,
      description,
      token
    })
    .then(()=>{
      setVisible(false)
    })
  }
  // .date[0].format('YYYY-MM-DD')
  const handleCancel = ()=>{
    setVisible(false)
    // console.log(members);
  }
  return (
    <div className={style.container}>
      <Button className={style.btn} onClick={showModal}>
        添加任务
      </Button>
      <Table 
        className={style.table} 
        dataSource={missions} 
        columns={columns}
        rowSelection={{
          type: 'checkbox'
        }}
      ></Table>

      <Modal visible={visible}
        onOk = {handleOk}
        onCancel={handleCancel}
        className={style.modal}
      >
        <div className={style.title}>添加任务</div>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          className={style.form}
          form={form}
         >
          <Form.Item
            label="任务标题"
            name="missionName"
            rules={[{ required: true, message: 'Please input your missionName!' }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="日期"
            name="date"
            rules={[{ required: true, message: 'Please input your date!' }]}
          >
            <RangePicker format="YYYY-MM-DD"></RangePicker>
          </Form.Item>
          <Form.Item
            label="优先级"
            name="priority"
            rules={[{ required: true, message: 'Please input your priority!' }]}
          >
            <Radio.Group>
              <Radio value="high">最高</Radio>
              <Radio value="high">较高</Radio>
              <Radio value="high">普通</Radio>
              <Radio value="high">最低</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="负责人"
            name="user_OakCode"
            rules={[{ required: true, message: 'Please input your personInCharge!' }]}
          >
            <Select
              placeholder="选择一个负责人"
            >
              {
                members.map((item)=>{
                  return <Option value={item.OakCode} key={item.OakCode}>{item.name}</Option>
                })
              }
            </Select>
          </Form.Item>
          <Form.Item
            label="描述"
            name="description"
            rules={[{ required: true, message: 'Please input your description!' }]}
          >
            <TextArea></TextArea>
          </Form.Item>
        </Form>
      </Modal>
    </div>
    
  )
}

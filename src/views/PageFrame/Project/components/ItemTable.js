import React, { useEffect, useState  } from 'react'
import { useHistory, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { Button, Modal, Form, Input, DatePicker, Radio, Select, Table, Space, Drawer, Popconfirm} from 'antd'
import moment from 'moment';

import api from '@/utils/api';
import style from './ItemTable.module.scss'

const { RangePicker } = DatePicker
const { Option } = Select
const { TextArea } = Input



export default function ItemTable() {
  const history = useHistory()
  //接收项目id
  const {id} = useParams()
  //弹出详情抽屉
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [form] = Form.useForm()
  const [form2] = Form.useForm()
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [missionBasis, setMissionBasis] = useState({})
  const [missionDetail, setMissionDetail] = useState({})
  const [doneSelection, setDoneSelection] = useState('doing')
  //添加弹窗
  const [visible, setVisible] = useState(false);
  //编辑弹窗
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [members, setMembers] = useState([])
  const [missions, setMissions] = useState([])
  const [doneMissions, setDoneMissions] = useState([])
  const [doingMissions, setDoingMissions] = useState([])
  const selectedTeam = useSelector(state => state.selectedTeam)
  // 初始化页面数据
  // #region
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

  useEffect(()=>{
    setDoneMissions(missions.filter(item=>{return item.status===true}))
    setDoingMissions(missions.filter(item=>{return item.status===false}))
  },[missions])
  // #endregion

  const columns = [
    {
      title: '任务标题',
      dataIndex: 'name',
      key: 'name',
      render:(text,record)=>{
        return(
          <a href='www.baidu.com' onClick={(e)=>{
            e.preventDefault()
            showDetail(record)
          }}>{text}</a>
        )
      }
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
    {
      title:'操作',
      key:'操作',
      render:(text,record)=>(
        <Space>
          <a href='www.baidu.com' onClick={(e)=>{
            e.preventDefault()
            showDetail(record)}}>详情</a>
          <a href='www.baidu.com' onClick={function(e){
            e.preventDefault()
            showEdit(record)
          }}>编辑</a>
          <Popconfirm
            title="你确认要删除该任务吗？"
            onConfirm={()=>{
              confirmDelete(record)
            }}
            onCancel={cancelDelete}
          >
            <a href='www.baidu.com'
              onClick={(e)=>{
                e.preventDefault()
              }}
              className={style.del} 
            >
              删除
            </a>
          </Popconfirm>
        </Space>
      )
    }
  ];
  
  //操作 添加modal 的三个方法
  // #region
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
      history.go(0)
    })
  }
  const handleCancel = ()=>{
    setVisible(false)
    // console.log(members);
  }
  // #endregion

  // 操作编辑弹窗的
  const showEdit = (record)=>{
    api.getMissionDetail({
      missionID:record.id,
      token:localStorage.getItem('token')
    })
    .then(res=>{
      setMissionDetail(res)
      setMissionBasis(record)
      setEditModalVisible(true)
    })
  }
  const handleEdit = ()=>{

    let {missionName, priority, date, user_OakCode, description} = form2.getFieldValue()
    console.log(form2.getFieldValue());
    let endDate = date[1].format('YYYY-MM-DD')
    let token = localStorage.getItem('token')
    api.updateMission({
      missionID:missionBasis.id,
      missionName,
      // startDate,
      endDate,
      user_OakCode,
      priority,
      description,
      token
    })
    .then(()=>{
      history.go(0)
    })
  }

  //操控已完成未完成的选择
  const onSelectDoneChange=(val)=>{
    setDoneSelection(val)
  }

  // 将打钩的设为已完成
  const clickComplete = ()=>{
    console.log(selectedRowKeys);
    let requests = selectedRowKeys.map((item)=>{
      return api.switchMissionStatus({
        missionID:item,
        token:localStorage.getItem('token')
      })
    })
    Promise.all(requests).then(res=>{
      history.go(0)
    })
  }

  // 详情弹窗相关
  // #region
  const showDetail = (e)=>{
    setDrawerVisible(true)
    setMissionBasis(e)
    api.getMissionDetail({
      missionID:e.id,
      token:localStorage.getItem('token')
    })
    .then(res=>{
      setMissionDetail(res)
    })
  }
  const onCloseDrawer =()=>{
    setDrawerVisible(false)
  }
  // #endregion

  const rowSelection = {
    onChange: (itemsKey, selectedRows) => {
      console.log(selectedRows);
      setSelectedRowKeys([...itemsKey])
    },
    type:'checkbox'
  };
  
  const selectDataSource = ()=>{
    if(doneSelection==='all'){
      return missions
    }
    if(doneSelection==='done'){
      return doneMissions
    }
    if(doneSelection==='doing'){
      return doingMissions
    }
  }

  //pop的确认删除和取消
  function confirmDelete(record){
    api.deleteMission({
      missionID:record.id,
      token:localStorage.getItem('token')
    })
    .then(res=>{
      console.log(res);
      history.go(0)
    })
  }
  function cancelDelete(){

  }
  return (
    <div className={style.container}>
      <div className={style.bar}>
        <Button className={style.btn} onClick={showModal}>
          添加任务
        </Button>
        <Select defaultValue="doing" className={style.select} onChange={onSelectDoneChange}>
          <Option value="doing">未完成</Option>
          <Option value="done">已完成</Option>
        </Select>
        <Button type="primary" 
          onClick={clickComplete} 
          className={style.completeBtn}
          disabled={selectedRowKeys.length===0}  
        >
          {doneSelection==='done'?'取消':'完成'}
        </Button>
      </div>
      <Table 
        className={style.table} 
        dataSource={selectDataSource()} 
        columns={columns}
        rowSelection={rowSelection}
      ></Table>
      <Modal visible={visible}
        onOk = {handleOk}
        onCancel={handleCancel}
        className={style.modalAdd}
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
              <Radio value="highest">最高</Radio>
              <Radio value="high">较高</Radio>
              <Radio value="normal">普通</Radio>
              <Radio value="low">低</Radio>
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
      <Modal visible={editModalVisible}
        onOk = {handleEdit}
        onCancel={function(){
          setEditModalVisible(false)
        }}
        className={style.modalAdd}
      >
        <div className={style.title}>编辑</div>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          className={style.form}
          form={form2}
         >
          <Form.Item
            label="任务标题"
            name="missionName"
            rules={[{ required: true, message: 'Please input your missionName!' }]}
            initialValue={missionBasis.name}
          >
            <Input placeholder={missionBasis.name}></Input>
          </Form.Item>
          <Form.Item
            label="日期"
            name="date"
            rules={[{ required: true, message: 'Please input your date!' }]}
            initialValue={[moment(missionDetail.start_date,'YYYY-MM-DD'),moment(missionBasis.end_date,'YYYY-MM-DD')]}
          >
            <RangePicker 
              format="YYYY-MM-DD"
              disabled={[true,false]}
              // defaultValue={[moment(missionDetail.start_date,'YYYY-MM-DD'),moment(missionBasis.end_date,'YYYY-MM-DD')]}
            >
            
            </RangePicker>
          </Form.Item>
          <Form.Item
            label="优先级"
            name="priority"
            rules={[{ required: true, message: 'Please input your priority!' }]}
            initialValue={missionBasis.priority}
          >
            <Radio.Group>
              <Radio value="highest">最高</Radio>
              <Radio value="high">较高</Radio>
              <Radio value="normal">普通</Radio>
              <Radio value="low">低</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="负责人"
            name="user_OakCode"
            rules={[{ required: true, message: 'Please input your personInCharge!' }]}
            initialValue={missionBasis.user_OakCode}
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
            initialValue={missionDetail.description}
          >
            <TextArea></TextArea>
          </Form.Item>
        </Form>
      </Modal>
      
      <Drawer title={missionBasis.name} 
        placement="right" 
        onClose={onCloseDrawer} 
        visible={drawerVisible}
        width={400}
        className={style.drawer}>
        <p>任务标题：{missionBasis.name}</p>
        <p>优先级：{missionBasis.priority}</p>
        <p>负责人：{missionBasis.user_name}</p>
        <p>开始时间：{missionDetail.start_date}</p>
        <p>结束时间：{missionBasis.end_date}</p>
        <p>详情：{missionDetail.description}</p>
      </Drawer>
    </div>
    
  )
}

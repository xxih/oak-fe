import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import style from './ItemTable.module.scss'

export default function ItemTable() {
  const [visible, setVisible] = useState(false);
  
  const showModal = ()=>{
    setVisible(true)
  }
  const handleOk = ()=>{
    setVisible(false)
  }
  const handleCancel = ()=>{
    setVisible(false)
  }
  return (
    <div className={style.container}>
      <Button onClick={showModal}>
        添加任务
      </Button>
      <Modal visible={visible}
        onOk = {handleOk}
        onCancel={handleCancel}
      >
        modal
      </Modal>
    </div>
    
  )
}

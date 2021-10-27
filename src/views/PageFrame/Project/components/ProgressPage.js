import api from '@/utils/api'
import { Progress } from 'antd';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import tools from '@/utils/tools'

export default function ProgressPage() {
  const {id} = useParams()
  const [stastic, setStastic] = useState({})

  useEffect(() => {
    api.getAllMission({
      projectID:id,
      token:localStorage.getItem('token')
    })
    .then(res=>{
      setStastic(tools.toProgressData(res))
    })
    
  }, [])

  function renderProgress(stastic){
    if(stastic.missionNumber===undefined){
      return <Progress type="circle" percent={0} format={percent=>``}/>
    }
    else if(stastic.missionNumber===0){
      return <Progress type="circle" percent={0} format={percent=>`无任务`} />
    }
    else{
      return <Progress type="circle" percent={stastic.done/stastic.missionNumber*100} />
    }
  }

  return (
    <div>
      {
        renderProgress(stastic)
      }
    </div>
  )
}

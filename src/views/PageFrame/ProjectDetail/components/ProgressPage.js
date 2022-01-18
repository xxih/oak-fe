import api from '@/utils/api'
import { Progress, Statistic } from 'antd';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import tools from '@/utils/tools'
import style from './ProgressPage.module.scss'

export default function ProgressPage() {
  const {id} = useParams()
  const [stastic, setStastic] = useState({})

  useEffect(() => {
    api.getAllMission({
      projectID:id,
      token:sessionStorage.getItem('token')
    })
    .then(res=>{
      setStastic(tools.toProgressData(res))
    })
    
  }, [])

  function renderProgress(stastic){
    if(stastic.missionNumber===undefined){
      return <Progress className={style.circle} width={250} type="circle" percent={0} format={percent=>``}/>
    }
    else if(stastic.missionNumber===0){
      return <Progress className={style.circle} width={250} type="circle" percent={0} format={percent=>`无任务`} />
    }
    else{
      return <Progress className={style.circle} width={250} type="circle" percent={(stastic.done/stastic.missionNumber*100).toFixed(2)} />
    }
  }

  return (
    <div className={style.container}>
      <div className={style.left}>
        <div className={style.doing}>
          <div className={style.text}>
            待处理任务
          </div>
          <div className={style.num}>
            {stastic.missionNumber-stastic.done}
          </div>
        </div>
        <div className={style.late}>
          <div className={style.text}></div>
          已延误任务
          <div className={style.num}>
            0
          </div>
        </div>
        <div className={style.done}>
          <div className={style.text}>
            已完成任务
          </div>
          <div className={style.num}>
            {stastic.done}
          </div>
        </div>
      </div>
      {
        renderProgress(stastic)
      }
    </div>
  )
}

import React, { useState } from 'react'
import style from './Project.module.scss'
import NoProject from './NoProject'
export default function Project() {
  const [noProject, setNoProject] = useState(1)
  return (
    <div className={style.container}>
      <div className={style.box}>
        {
          noProject?<NoProject/>:
          (
            <div>has</div>
          )
        }
      </div>
    </div>
  )
}

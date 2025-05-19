import React from 'react'
import { Outlet } from 'react-router-dom'

const MasterElement = () => {
  return (
    <div>MasterElement
      <hr />
      <Outlet/>
    </div>
  )
}

export default MasterElement
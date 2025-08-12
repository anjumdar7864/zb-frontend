import { CircularProgress } from '@mui/material'
import React from 'react'

const CircularLoader = ({color = "#00b388" , size = "sm"}) => {
  return (
    <div>
        <CircularProgress sx={{ color:color }} size={size == "sm" ? "20px" : size == "md" ? "40px" : size == "lg" ? "60px" : ""} disableShrink />
    </div>
  )
}

export default CircularLoader

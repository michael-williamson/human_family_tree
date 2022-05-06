import React from 'react'
import { SwipeableDrawer } from '@mui/material'

export const SwipeableDrawerComponent = (props) => {
    const {children} = props
  return (
    <SwipeableDrawer {...props} >
        {children}
    </SwipeableDrawer>

  )
}

import React from 'react'
import { Box } from '@mui/system'

export const TextComponent = (props) => {
    const {text,styles} = props;
  return (
   <Box sx={styles}>{text}</Box>
  )
}

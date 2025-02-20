import { Box } from '@mui/material'
import React from 'react'

export const App: React.FC = () => {
  return (
    <Box p={2}>
      <Box pb={3}>
        <img src="/img/logo.svg" alt="logo" style={{ height: 60, marginRight: 20 }} />
      </Box>
    </Box>
  )
}

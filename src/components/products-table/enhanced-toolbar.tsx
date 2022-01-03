import React, { MouseEventHandler } from 'react'
import { Toolbar, IconButton, Button, Typography, Box } from '@material-ui/core'
import { ClearAll } from '@material-ui/icons'

import styles from '@/styles/Home.module.css'

interface EnhancedToolbarProps {
  toggleAllRows: MouseEventHandler
  toggleCompare: MouseEventHandler
  numSelected: number
}

const EnhancedToolbar = ({ toggleAllRows, toggleCompare, numSelected }: EnhancedToolbarProps) => {
  return (
    <Toolbar className={styles.toolbar}>
      <Box className={styles.toolbarClearControls}>
        <IconButton onClick={toggleAllRows} disabled={!numSelected}>
          <ClearAll />
        </IconButton>
        {!!numSelected && <Typography>{numSelected} products selected</Typography>}
      </Box>
      <Button variant="contained" disabled={numSelected < 2} onClick={toggleCompare}>
        {numSelected < 2 ? 'Select 2 products to compare' : 'Compare Products'}
      </Button>
    </Toolbar>
  )
}

export default EnhancedToolbar

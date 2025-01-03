import React, { useState } from 'react'
import { Box, Button } from '@mui/material'
import SelectDarkLight from '~/Combonents/ModeSelect/ModeSelect'
import SvgIcon from '@mui/material/SvgIcon'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import Typography from '@mui/material/Typography'
import WorkSpaces from './Menus/WorkSpaces'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import Tooltip from '@mui/material/Tooltip'
import Profiles from './Menus/Profiles'
import HelpIcon from '@mui/icons-material/Help'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import List from '@mui/material/List'
import PostAddIcon from '@mui/icons-material/PostAdd'
import { Link } from 'react-router-dom'
import Notifications from './Notifications/Notifications'
import AutoCompleteSearchBoard from './SearchBoards/AutoCompleteSearchBoard'
const AppBar = () => {
  return (
    <Box sx={{
      px: 2,
      width: '100%',
      height: (theme) => theme.trello.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0')
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
        <Link to={'/boards'}>
          <Tooltip title="Boards list">
            <AppsIcon sx={{ color: 'white', verticalAlign: 'middle' }} />
          </Tooltip>
        </Link>
        <Link to={'/'}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
            <SvgIcon component={TrelloIcon} inheritViewBox sx={{ color: 'white' }} />
            <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>Trello</Typography>
          </Box>
        </Link>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <WorkSpaces />
          <Recent />
          <Starred />
          <Templates />
          <Button
            variant='outlined'
            startIcon={<PostAddIcon />}
            sx={{ color: 'white', border: 'none', '&:hover': { border: 'none' } }}>
            Create</Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5 }}>
        <AutoCompleteSearchBoard />
        {/* dark - light - system mode */}
        <SelectDarkLight />
        {/* xu ly hien thi cac thong bao notifications */}
        <Notifications />

        <Tooltip title='Help' >
          <HelpIcon sx={{ color: 'white' }} />
        </Tooltip>
        <Profiles />
      </Box>
    </Box>
  )
}

export default AppBar

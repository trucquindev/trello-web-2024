import React, { useState } from 'react'
import { Box, Button } from '@mui/material'
import SelectDarkLight from '~/Combonents/ModelSelect'
import SvgIcon from '@mui/material/SvgIcon'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as TrelloIcon } from '~/assets/mdi--trello.svg'
import Typography from '@mui/material/Typography'
import WorkSpaces from './Menus/WorkSpaces'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Tooltip from '@mui/material/Tooltip'
import Profiles from './Menus/Profiles'
import HelpIcon from '@mui/icons-material/Help'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import List from '@mui/material/List'
import Drawer from '@mui/material/Drawer'
import PostAddIcon from '@mui/icons-material/PostAdd'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
const AppBar = () => {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = useState('')
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const DrawerList = (
    <Box sx={{ width: 200 }} role="presentation">
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <WorkSpaces/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Recent/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Starred/>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Templates/>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )
  return (
    <Box sx={ {
      px:2,
      width:'100%',
      height: (theme) => theme.trello.appBarHeight,
      display:'flex',
      alignItems:'center',
      justifyContent:'space-between',
      gap:2,
      overflowX:'auto',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0')
    } }>
      <Box sx={ { display:'flex', alignItems:'center', justifyContent:'center', gap:1 } }>
        <AppsIcon sx={ { color:'white' } } onClick={toggleDrawer(true)}/>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
        <Box sx={ { display:'flex', alignItems:'center', justifyContent:'center', gap:0.5 } }>
          <SvgIcon component={TrelloIcon} inheritViewBox sx={ { color:'white' } } />
          <Typography variant='span' sx={ { fontSize:'1.2rem', fontWeight:'bold', color:'white' } }>Trello</Typography>
        </Box>
        <Box sx={{ display: { xs:'none', md:'flex' }, gap: 1 }}>
          <WorkSpaces/>
          <Recent/>
          <Starred/>
          <Templates/>
          <Button
            variant='outlined'
            startIcon = {<PostAddIcon/>}
            sx={{ color: 'white', border:'none', '&:hover': { border:'none' } }}>
              Create</Button>
        </Box>
      </Box>
      <Box sx={ { display:'flex', alignItems:'center', justifyContent:'center', gap:1.5 } }>
        <TextField
          id="outlined-search"
          label="Search..."
          type="text"
          size='small'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'white' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="start">
                {searchValue===''? '' : (<CloseIcon
                  fontSize='small'
                  sx={{ color: 'white', cursor: 'pointer' }}
                  onClick={() => setSearchValue('')}
                />)}
              </InputAdornment>
            )
          }}
          sx={{
            minWidth:120,
            maxWidth:'170px',
            '& label': { color: 'white' },
            '& input': { color: 'white' },
            '& label.Mui-focused': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset':{
                borderColor:'white'
              },
              '&:hover fieldset':{
                borderColor:'white'
              },
              '&.MuiOutlinedInput-root fieldset':{
                borderColor:'white'
              }
            }
          }}
        />
        <SelectDarkLight/>
        <Tooltip title='Notifications' >
          <Badge
            color="success"
            variant="dot"
            sx={ { cursor:'pointer' } }>
            <NotificationsNoneIcon sx={{ color: 'white' }}/>
          </Badge>
        </Tooltip>

        <Tooltip title='Help' >
          <HelpIcon sx={{ color: 'white' }}/>
        </Tooltip>
        <Profiles/>
      </Box>
    </Box>
  )
}

export default AppBar

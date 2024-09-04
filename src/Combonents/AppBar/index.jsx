import React from 'react'
import { Box } from '@mui/material'
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
import HelpIcon from '@mui/icons-material/Help';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
const AppBar = () => {
  const [open, setOpen] = React.useState(false);

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
      overflowX:'auto'
    } }>
      <Box sx={ { display:'flex', alignItems:'center', justifyContent:'center', gap:1 } }>
        <AppsIcon sx={ { color:'primary.main' } } onClick={toggleDrawer(true)}/>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
        <Box sx={ { display:'flex', alignItems:'center', justifyContent:'center', gap:0.5 } }>
          <SvgIcon component={TrelloIcon} inheritViewBox sx={ { color:'primary.main' } } />
          <Typography variant='span' sx={ { fontSize:'1.2rem', fontWeight:'bold' } }>Trello</Typography>
        </Box>
        <Box sx={{ display: { xs:'none', md:'flex' } }}>
          <WorkSpaces/>
          <Recent/>
          <Starred/>
          <Templates/>
        </Box>
      </Box>
      <Box sx={ { display:'flex', alignItems:'center', justifyContent:'center', gap:1.5 } }>
        <TextField id="outlined-search" label="Search..." type="search" size='small' sx={{ minWidth:120 }}/>
        <SelectDarkLight/>
        <Tooltip title='Notifications' >
          <Badge color="secondary" variant="dot" sx={ { cursor:'pointer' } }>
            <NotificationsNoneIcon sx={{ color: 'primary.main' }}/>
          </Badge>
        </Tooltip>

        <Tooltip title='Help' >
          <HelpIcon sx={{ color: 'primary.main' }}/>
        </Tooltip>
        <Profiles/>
      </Box>
    </Box>
  )
}

export default AppBar

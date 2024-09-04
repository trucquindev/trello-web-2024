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
const AppBar = () => {
  return (
    <Box sx={ {
      px:2,
      width:'100%',
      height: (theme) => theme.trello.appBarHeight,
      display:'flex',
      alignItems:'center',
      justifyContent:'space-between'
    } }>
      <Box sx={ { display:'flex', alignItems:'center', justifyContent:'center', gap:1 } }>
        <AppsIcon sx={ { color:'primary.main' } }/>
        <Box sx={ { display:'flex', alignItems:'center', justifyContent:'center', gap:0.5 } }>
          <SvgIcon component={TrelloIcon} inheritViewBox sx={ { color:'primary.main' } } />
          <Typography variant='span' sx={ { fontSize:'1.2rem', fontWeight:'bold' } }>Trello</Typography>
        </Box>
        <WorkSpaces/>
        <Recent/>
        <Starred/>
        <Templates/>
      </Box>
      <Box sx={ { display:'flex', alignItems:'center', justifyContent:'center', gap:1 } }>
        <TextField id="outlined-search" label="Search..." type="search" size='small'/>
        <SelectDarkLight/>
        <Tooltip title='Notifications' >
          <Badge color="secondary" variant="dot" sx={ { cursor:'pointer' } }>
            <NotificationsNoneIcon />
          </Badge>
        </Tooltip>
        <Profiles/>
      </Box>
    </Box>
  )
}

export default AppBar

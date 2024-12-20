import { Box, Tooltip } from '@mui/material'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import BoardUserGroup from './BoardUserGroup'
const menu_style = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none', px: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50  '
  }
}
const BoardBar = ({ board }) => {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      px: 2,
      overflowX: 'auto',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2')
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
        <Tooltip title={board?.description}>
          <Chip
            sx={menu_style}
            icon={<DashboardIcon />}
            label={board?.title}
            clickable />
        </Tooltip>
        <Chip
          sx={menu_style}
          icon={<VpnLockIcon />}
          label={`${board?.type?.charAt(0)?.toUpperCase() || ''}${board?.type?.slice(1) || ''}`}
          clickable />
        <Chip
          sx={menu_style}
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          clickable />
        <Chip
          sx={menu_style}
          icon={<BoltIcon />}
          label="Automation"
          clickable />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
        <Button
          variant='outlined'
          startIcon={<PersonAddIcon />}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': { borderColor: 'white' }
          }}
        >
          Invite
        </Button>
        {/* XU LI HIEN THI THANH VIEN CUA BOARD */}
        <BoardUserGroup boardUsers={board?.FE_allUsers} />
      </Box>
    </Box>
  )
}

export default BoardBar

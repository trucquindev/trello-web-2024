import Box from '@mui/material/Box'
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import AddCardIcon from '@mui/icons-material/AddCard'
import { Button } from '@mui/material'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import AttachmentIcon from '@mui/icons-material/Attachment';
import CommentIcon from '@mui/icons-material/Comment';
const COLUMN_HEADER_HEIGHT= '50px'
const COLUMN_FOOTER_HEIGHT= '56px'
const BoardContent = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl)
  const handleClick = (event) => { setAnchorEl(event.currentTarget) };
  const handleClose = () => {
    setAnchorEl(null)
  };
  return (
    <Box sx={ {
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
      width:'100%',
      height:(theme) => theme.trello.boardContentHeight,
      p:'10px 0',
    } }>
      {/* Box column */}
      <Box sx={{
        bgcolor:'inherit',
        width:'100%',
        height:'100%',
        display:'flex',
        overflowX:'auto',
        overflowY:'hidden',
        '&::-webkit-scrollbar-track':{ margin:2 }
      }}>
        {/* Box column 1*/}
        <Box sx={{
          minWidth:'300px',
          maxWidth:'300px',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#222f3e' : '#ebecf0'),
          ml:2,
          borderRadius:'6px',
          height:'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }}>
          {/* Box column header */}
          <Box sx={{
            height:COLUMN_HEADER_HEIGHT,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent:'space-between'
          }}>
            <Typography variant='h6' sx={{
              fontSize:'1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Column Title</Typography>
            <Box>
              <Tooltip title="More options">
                <KeyboardArrowDownIcon
                  sx={{ color:'text.primary', cursor:'pointer' }}
                  id="basic-column-dropdown"
                  aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}/>
              </Tooltip>
              <Menu
                id="basic-menu-column-dropdown"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-column-dropdown',
                }}
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>Add new card</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    ⌘X
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                  <ListItemText>Coppy</ListItemText>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    ⌘C
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                  <ListItemText>Paste</ListItemText>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    ⌘V
                  </Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                  <ListItemIcon><DeleteIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>Remove this column</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                  <ListItemText>Archive this column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          {/* Box column list card */}
          <Box sx={{
            p:'0 5px',
            m:'0 5px',
            display:'flex',
            flexDirection:'column',
            gap:1,
            overflowX:'hidden',
            overflowY:'auto',
            maxHeight:(theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTER_HEIGHT})`,
            '&::-webkit-scrollbar-thumb': { background: '#ced0da' },
            '&::-webkit-scrollbar-thumb:hover': { background: '#bfc2cf' }
          }}>
            <Card sx={{
              cursor: 'pointer',
              boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
              overflow:'unset'
            }}>
              <CardMedia
                sx={{ height: 140, objectFit: 'contain' }}
                image="https://inkythuatso.com/uploads/thumbnails/800/2022/03/anh-dai-dien-facebook-dep-cho-nam-30-28-16-26-50.jpg"
                title="green iguana"
              />
              <CardContent sx={{ p:1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Quindev - fullstack developer</Typography>
              </CardContent>
              <CardActions sx={{ p:'0px 4px 8px 4px' }}>
                <Button size="small" startIcon={<GroupIcon/>}>20</Button>
                <Button size="small" startIcon={<CommentIcon/>}>50</Button>
                <Button size="small" startIcon={<AttachmentIcon/>}>2</Button>
              </CardActions>
            </Card>

            <Card sx={{
              cursor: 'pointer',
              boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
              overflow:'unset'
            }}>
              <CardContent sx={{ p:1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Cart 1</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
              overflow:'unset'
            }}>
              <CardContent sx={{ p:1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Cart 1</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
              overflow:'unset'
            }}>
              <CardContent sx={{ p:1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Cart 1</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
              overflow:'unset'
            }}>
              <CardContent sx={{ p:1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Cart 1</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
              overflow:'unset'
            }}>
              <CardContent sx={{ p:1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Cart 1</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
              overflow:'unset'
            }}>
              <CardContent sx={{ p:1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Cart 1</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
              overflow:'unset'
            }}>
              <CardContent sx={{ p:1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Cart 1</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
              overflow:'unset'
            }}>
              <CardContent sx={{ p:1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Cart 1</Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
              overflow:'unset'
            }}>
              <CardContent sx={{ p:1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Cart 1</Typography>
              </CardContent>
            </Card>
          </Box>
          {/* Box column footer */}
          <Box sx={{
            height:COLUMN_FOOTER_HEIGHT,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent:'space-between'
          }}>
            <Button startIcon={<AddCardIcon/>}>Add new card</Button>
            <Tooltip title='Drag to move'>
              <DragHandleIcon sx={{ cursor:'pointer' }}/>
            </Tooltip>
          </Box>
        </Box>
        {/* box 2 */}
        <Box sx={{
          minWidth:'300px',
          maxWidth:'300px',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#222f3e' : '#ebecf0'),
          ml:2,
          borderRadius:'6px',
          height:'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }}>
          {/* Box column header */}
          <Box sx={{
            height:COLUMN_HEADER_HEIGHT,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent:'space-between'
          }}>
            <Typography variant='h6' sx={{
              fontSize:'1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Column Title</Typography>
            <Box>
              <Tooltip title="More options">
                <KeyboardArrowDownIcon
                  sx={{ color:'text.primary', cursor:'pointer' }}
                  id="basic-column-dropdown"
                  aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}/>
              </Tooltip>
              <Menu
                id="basic-menu-column-dropdown"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-column-dropdown',
                }}
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>Add new card</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    ⌘X
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                  <ListItemText>Coppy</ListItemText>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    ⌘C
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                  <ListItemText>Paste</ListItemText>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    ⌘V
                  </Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                  <ListItemIcon><DeleteIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>Remove this column</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                  <ListItemText>Archive this column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          {/* Box column list card */}
          <Box sx={{
            p:'0 5px',
            m:'0 5px',
            display:'flex',
            flexDirection:'column',
            gap:1,
            overflowX:'hidden',
            overflowY:'auto',
            maxHeight:(theme) => `calc(${theme.trello.boardContentHeight}
            - ${theme.spacing(5)}
            - ${COLUMN_HEADER_HEIGHT}
            - ${COLUMN_FOOTER_HEIGHT})`,
            '&::-webkit-scrollbar-thumb': { background: '#ced0da' },
            '&::-webkit-scrollbar-thumb:hover': { background: '#bfc2cf' }
          }}>
            <Card sx={{
              cursor: 'pointer',
              boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
              overflow:'unset'
            }}>
              <CardMedia
                sx={{ height: 140, objectFit: 'contain' }}
                image="https://inkythuatso.com/uploads/thumbnails/800/2022/03/anh-dai-dien-facebook-dep-cho-nam-30-28-16-26-50.jpg"
                title="green iguana"
              />
              <CardContent sx={{ p:1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Quindev - fullstack developer</Typography>
              </CardContent>
              <CardActions sx={{ p:'0px 4px 8px 4px' }}>
                <Button size="small" startIcon={<GroupIcon/>}>20</Button>
                <Button size="small" startIcon={<CommentIcon/>}>50</Button>
                <Button size="small" startIcon={<AttachmentIcon/>}>2</Button>
              </CardActions>
            </Card>

            <Card sx={{
              cursor: 'pointer',
              boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
              overflow:'unset'
            }}>
              <CardContent sx={{ p:1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>Cart 1</Typography>
              </CardContent>
            </Card>
          </Box>
          {/* Box column footer */}
          <Box sx={{
            height:COLUMN_FOOTER_HEIGHT,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent:'space-between'
          }}>
            <Button startIcon={<AddCardIcon/>}>Add new card</Button>
            <Tooltip title='Drag to move'>
              <DragHandleIcon sx={{ cursor:'pointer' }}/>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default BoardContent

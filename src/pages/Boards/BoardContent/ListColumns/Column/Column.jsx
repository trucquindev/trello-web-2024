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
import ListCards from './ListCards/ListCards'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import CloseIcon from '@mui/icons-material/Close'
import TextField from '@mui/material/TextField'
import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'
import { cloneDeep } from 'lodash'
import { createNewCardAPI, deleteColumnAPI, updateColumnDetailsApi } from '~/apis'
import { updateCurrentActiveBoard, selectCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux';
import ToggleFocusInput from '~/Combonents/Form/ToggleFocusInput'
const Column = ({ column, columnId }) => {
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)
  //kéo thả
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column._id,
    data: { ...column }
  })
  const dndKitColumnStyles = {
    transform: CSS.Translate.toString(transform),
    // touchAction:'none', // dùng cho sensorpoiter
    transition,
    height: '100%',
    opacity: isDragging ? 0.5 : undefined,
  };
  //mở menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl)
  const handleClick = (event) => { setAnchorEl(event.currentTarget) };
  const handleClose = () => {
    setAnchorEl(null)
  };
  //sắp xếp card
  const orderedCards = column?.cards

  const [newCardForm, setNewCardForm] = useState(false)
  const [valueCardTitle, setValueCardTitle] = useState('')
  const toggleNewCardForm = () => setNewCardForm(!newCardForm)
  const addNewCard = async () => {
    if (!valueCardTitle) {
      toast.error('Please insert a title for the new Card', {
        position: 'bottom-right'
      })
      return
    }
    const newCardData = {
      title: valueCardTitle,
      columnId: columnId
    }
    //function call api create card va lam lai state board
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id,
    });
    // tương tự như owe trên
    const newBoard = cloneDeep(board);
    const columnToUpdate = newBoard.columns.find(
      (column) => column._id === createdCard.columnId
    );
    if (columnToUpdate) {
      columnToUpdate.cards.push(createdCard);
      columnToUpdate.cardOrderIds.push(createdCard._id);
    }
    dispatch(updateCurrentActiveBoard(newBoard))
    // dong trang thai them Card va claer input
    toggleNewCardForm()
    setValueCardTitle('')
  }
  // xóa column va cards ben trong no
  const confirmDeleteColumn = useConfirm()
  const handleDeleteColumn = () => {
    confirmDeleteColumn({
      title: 'Delete Column',
      description: 'This action will permanently delete your Column and its Cards! Are you sure you want to delete?',
      confirmationText: 'Okay em nhoe',
      cancellationText: 'Tao deo xoa dau',
      // allowClose:false,
      // dialogProps:{ maxWidth:'xs' },
      // confirmationButtonProps:{ color: 'secondary', variant:'outlined' },
      // cancellationButtonProps:{ color: 'inherit' },
      // confirmationKeyword:'' cai nay rat hay phai go dung chu trong confirm moi duoc xoa
    })
      .then(() => {
        // goi api xu li delete
        deleteColumnAPI(columnId).then((res) => {
          toast.success(res?.deleteResult);
          if (res.err === 0) {
            //update dữ liệu board
            const newBoard = { ...board };
            newBoard.columns = newBoard.columns.filter((c) => c._id !== columnId);
            newBoard.columnOrderIds = newBoard.columnOrderIds.filter(
              (_id) => _id !== columnId
            );
            dispatch(updateCurrentActiveBoard(newBoard))
          }
        });
      })
      .catch(() => {
        /* ... */
      })
  }

  const onUpdateColumnTitle = (newTitle) => {

    //Goi API update column va xu ly mot chu trong redux
    updateColumnDetailsApi(column._id, { title: newTitle }).then(() => {
      //update dữ liệu board
      const newBoard = cloneDeep(board);
      const columnToUpdate = newBoard.columns.find(
        (c) => column._id === c._id
      );
      if (columnToUpdate) {
        columnToUpdate.title = newTitle;
      }
      dispatch(updateCurrentActiveBoard(newBoard))
    })
  }
  return (
    <div ref={setNodeRef} style={dndKitColumnStyles} {...attributes}>
      <Box
        {...listeners}
        sx={{
          minWidth: '300px',
          maxWidth: '300px',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#222f3e' : '#ebecf0'),
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }}
      >
        {/* Box column header */}
        <Box sx={{
          height: (theme) => (theme.trello.columnHeaderHeight),
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <ToggleFocusInput value={column.title} onChangedValue={onUpdateColumnTitle} data-no-dnd="true"
          />
          <Box>
            <Tooltip title="More options">
              <KeyboardArrowDownIcon
                sx={{ color: 'text.primary', cursor: 'pointer' }}
                id="basic-column-dropdown"
                aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick} />
            </Tooltip>
            <Menu
              id="basic-menu-column-dropdown"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-column-dropdown',
              }}
            >
              <MenuItem
                onClick={toggleNewCardForm}
                sx={{
                  '&:hover': {
                    color: 'success.light',
                    '& .add-card-icon': { color: 'success.light' }
                  }
                }}>
                <ListItemIcon><AddCardIcon className='add-card-icon' fontSize="small" /></ListItemIcon>
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
              <MenuItem
                onClick={handleDeleteColumn}
                sx={{
                  '&:hover': {
                    color: 'warning.dark',
                    '& .delete-forever-icon': { color: 'warning.dark' }
                  }
                }}>
                <ListItemIcon><DeleteIcon className='delete-forever-icon' fontSize="small" /></ListItemIcon>
                <ListItemText>Delete this column</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        {/*list card */}
        <ListCards cards={orderedCards} />
        {/* Box column footer */}
        <Box sx={{
          height: (theme) => (theme.trello.columnFooterHeight),
          p: 2
        }}>
          {!newCardForm
            ? <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '100%'
            }}>
              <Button startIcon={<AddCardIcon />} onClick={toggleNewCardForm}>Add new card</Button>
              <Tooltip title='Drag to move'>
                <DragHandleIcon sx={{ cursor: 'pointer' }} />
              </Tooltip>
            </Box> :
            <Box sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <TextField
                label="Enter card title..."
                type="text"
                size='small'
                variant='outlined'
                autoFocus
                data-no-dnd="true"
                value={valueCardTitle}
                onChange={(e) => setValueCardTitle(e.target.value)}
                sx={{
                  '& label': { color: 'text.primary' },
                  '& input': {
                    color: (theme) => theme.palette.primary.main,
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : 'white')
                  },
                  '& label.Mui-focused': { color: (theme) => theme.palette.primary.main },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: (theme) => theme.palette.primary.main },
                    '&:hover fieldset': { borderColor: (theme) => theme.palette.primary.main },
                    '&.Mui-focused fieldset': { borderColor: (theme) => theme.palette.primary.main }
                  },
                  '& .MuiOutlineInput-input': { borderRadius: 1 }
                }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button
                  className='interceptor-loading'
                  onClick={addNewCard}
                  data-no-dnd="true"
                  variant='contained' color='success' size='small'
                  sx={{
                    boxShadow: 'none',
                    border: '0.5px solid',
                    borderColor: (theme) => theme.palette.success.main,
                    '&:hover': { bgcolor: (theme) => theme.palette.success.main }
                  }}
                >
                  Add
                </Button>
                <CloseIcon
                  fontSize='small'
                  sx={{
                    color: (theme) => theme.palette.warning.light,
                    cursor: 'pointer'
                  }}
                  onClick={toggleNewCardForm}
                />
              </Box>
            </Box>
          }
        </Box>
      </Box>
    </div>
  )
}

export default Column

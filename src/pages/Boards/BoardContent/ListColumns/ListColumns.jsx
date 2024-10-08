import Box from '@mui/material/Box'
import Column from './Column/Column'
import { Button } from '@mui/material'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import CloseIcon from '@mui/icons-material/Close'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import { toast } from 'react-toastify'
const ListColumns = ({ columns, createNewColumn, createNewCard, deleteColumn }) => {
  const [newColumnForm, setNewColumnForm] = useState(false)
  const [valueColumnTitle, setValueColumnTitle] = useState('')
  const toggleNewColumnForm = () => setNewColumnForm(!newColumnForm)
  const addNewCoulmn = async() => {
    if (!valueColumnTitle) {
      toast.error('Please insert a title for the new column')
      return
    }
    //tao du lieu de call api
    const newColumnData = {
      title: valueColumnTitle
    }
    await createNewColumn(newColumnData)
    // dong trang thai them column va claer input
    toggleNewColumnForm()
    setValueColumnTitle('')
  }
  return (
    <SortableContext items={columns?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
      <Box sx={{
        bgcolor:'inherit',
        width:'100%',
        height:'100%',
        display:'flex',
        overflowX:'auto',
        overflowY:'hidden',
        '&::-webkit-scrollbar-track':{ margin:2 }
      }}>
        {/* Box column test 01*/}
        {columns?.map((column) => (<Column createNewCard = {createNewCard} columnId = {column._id} key={column?._id} column={column} deleteColumn= {deleteColumn} />))}
        {/* Box add new column CTA */}
        {!newColumnForm ?
          <Box
            onClick = {toggleNewColumnForm}
            sx={{
              minWidth:'250px',
              maxWidth:'250px',
              mx:2,
              borderRadius:'6px',
              height:'fit-content',
              bgcolor:'#ffffff3d',
            }}>
            <Button startIcon= {<LibraryAddIcon />}
              sx={{
                color:'white',
                width:'100%',
                justifyContent:'flex-start',
                pl:2.5,
                py:1
              }}>
              Add new Column
            </Button>
          </Box> :
          <Box sx={{
            minWidth:'250px',
            maxWidth:'250px',
            mx:2,
            p:1,
            borderRadius:'6px',
            height:'fit-content',
            bgcolor:'#ffffff3d',
            display:'flex',
            flexDirection:'column',
            gap:1
          }}>
            <TextField
              label="Enter coulmn title..."
              type="text"
              size='small'
              variant='outlined'
              autoFocus
              value={valueColumnTitle}
              onChange={(e) => setValueColumnTitle(e.target.value)}
              sx={{
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
            <Box sx={{ display:'flex', alignItems:'center', gap:1 }}>
              <Button
                onClick={addNewCoulmn}
                variant= 'contained' color= 'success' size= 'small'
                sx={{
                  boxShadow:'none',
                  border:'0.5px solid',
                  borderColor:(theme) => theme.palette.success.main,
                  '&:hover':{ bgcolor: (theme) => theme.palette.success.main }
                }}
              >
                Add column
              </Button>
              <CloseIcon
                fontSize='small'
                sx={{ color: 'white',
                  cursor: 'pointer',
                  '&:hover':{ color: (theme) => theme.palette.warning.light }
                }}
                onClick={ toggleNewColumnForm }
              />
            </Box>
          </Box>
        }
      </Box>
    </SortableContext>
  )
}

export default ListColumns

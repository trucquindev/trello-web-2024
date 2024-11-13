import Box from '@mui/material/Box'
import Column from './Column/Column'
import { Button } from '@mui/material'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import CloseIcon from '@mui/icons-material/Close'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { generatePlaceholderCard } from '~/untils/formatters';

import { createNewColumnAPI } from '~/apis/index'
import { useDispatch, useSelector } from 'react-redux'
import { cloneDeep } from 'lodash'
import { updateCurrentActiveBoard, selectCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
const ListColumns = ({ columns }) => {
  const dispatch = useDispatch()
  const [newColumnForm, setNewColumnForm] = useState(false)
  const [valueColumnTitle, setValueColumnTitle] = useState('')
  const board = useSelector(selectCurrentActiveBoard)
  const toggleNewColumnForm = () => setNewColumnForm(!newColumnForm)
  const addNewColumn = async () => {
    if (!valueColumnTitle) {
      toast.error('Please insert a title for the new column')
      return
    }
    //tao du lieu de call api
    const newColumnData = {
      title: valueColumnTitle
    }
    //function call api create column
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id,
    });
    // tao 1 column rong de keo tha
    createdColumn.cards = [generatePlaceholderCard(createdColumn)];
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id];


    //cap nhat state board
    // Dính lỗi object is not extensible bởi dù đã copy/clone ra giá trị newBoard nhưng bản chất của spread operator là Shallow Copy/Clone, nên dính phải rules Immutability trong redux tookit
    // không dùng được hàm push (sửa giá trị trực tiếp của mảng), cách đơn giản là chúng ta dùng tới deep Copy/Clone toàn bộ cái board cho dễ hiểu, ngắn gọn
    //https://redux-toolkit.js.org/usage/immer-reducers
    // const newBoard = { ...board };
    const newBoard = cloneDeep(board);
    // thêm column vào mảng columns của board
    // newBoard.columns.push(createdColumn);
    // thêm id của column vào mảng columnOrderIds của board
    // newBoard.columnOrderIds.push(createdColumn._id);
    // cap nhat state board
    newBoard.columns.push(createdColumn);
    newBoard.columnOrderIds.push(createdColumn._id);
    //cap nhat du lieu state board
    dispatch(updateCurrentActiveBoard(newBoard))
    // dong trang thai them column va claer input
    toggleNewColumnForm()
    setValueColumnTitle('')
  }
  return (
    <SortableContext items={columns?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
      <Box sx={{
        bgcolor: 'inherit',
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track': { margin: 2 }
      }}>
        {/* Box column test 01*/}
        {columns?.map((column) => (<Column columnId={column._id} key={column?._id} column={column} />))}
        {/* Box add new column CTA */}
        {!newColumnForm ?
          <Box
            onClick={toggleNewColumnForm}
            sx={{
              minWidth: '250px',
              maxWidth: '250px',
              mx: 2,
              borderRadius: '6px',
              height: 'fit-content',
              bgcolor: '#ffffff3d',
            }}>
            <Button startIcon={<LibraryAddIcon />}
              sx={{
                color: 'white',
                width: '100%',
                justifyContent: 'flex-start',
                pl: 2.5,
                py: 1
              }}>
              Add new Column
            </Button>
          </Box> :
          <Box sx={{
            minWidth: '250px',
            maxWidth: '250px',
            mx: 2,
            p: 1,
            borderRadius: '6px',
            height: 'fit-content',
            bgcolor: '#ffffff3d',
            display: 'flex',
            flexDirection: 'column',
            gap: 1
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
                  '& fieldset': {
                    borderColor: 'white'
                  },
                  '&:hover fieldset': {
                    borderColor: 'white'
                  },
                  '&.MuiOutlinedInput-root fieldset': {
                    borderColor: 'white'
                  }
                }
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                onClick={addNewColumn}
                variant='contained' color='success' size='small'
                sx={{
                  boxShadow: 'none',
                  border: '0.5px solid',
                  borderColor: (theme) => theme.palette.success.main,
                  '&:hover': { bgcolor: (theme) => theme.palette.success.main }
                }}
              >
                Add column
              </Button>
              <CloseIcon
                fontSize='small'
                sx={{
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': { color: (theme) => theme.palette.warning.light }
                }}
                onClick={toggleNewColumnForm}
              />
            </Box>
          </Box>
        }
      </Box>
    </SortableContext>
  )
}

export default ListColumns

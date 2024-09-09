import Box from '@mui/material/Box'
import Column from './Column/Column'
import { Button } from '@mui/material'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
const ListColumns = ({ columns }) => {
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
        {columns?.map((column) => (<Column key={column?._id} column={column} />))}
        {/* Box add new column CTA */}
        <Box sx={{
          minWidth:'200px',
          maxWidth:'200px',
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
        </Box>
      </Box>
    </SortableContext>
  )
}

export default ListColumns

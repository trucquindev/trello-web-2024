import Box from '@mui/material/Box'
import Column from './Column/Column'
import { Button } from '@mui/material'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
const ListColumns = () => {
  return (
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
      <Column/>
      <Column/>
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
  )
}

export default ListColumns

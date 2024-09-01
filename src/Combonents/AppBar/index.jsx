import { Box } from '@mui/material'
import SelectDarkLight from '../../Combonents/ModelSelect'
const AppBar = () => {
  return (
    <Box sx={ {
      backgroundColor:'primary.light',
      width:'100%',
      height: (theme) => theme.trello.appBarHeight,
      display:'flex',
      alignItems:'center'
    } }>
      <SelectDarkLight/>
    </Box>
  )
}

export default AppBar

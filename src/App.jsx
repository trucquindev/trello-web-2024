import { useColorScheme } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import LightModeIcon from '@mui/icons-material/LightMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import Box from '@mui/material/Box';
import { Container } from '@mui/material'
import theme from './theme'
function App() {
  function SelectDarkLight() {
    const { mode, setMode } = useColorScheme();
    const handleChange = (event) => {
      setMode(event.target.value)
    };
    return (
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="select-dark-light-system">Mode</InputLabel>
        <Select
          labelId="select-dark-light-system"
          id="dark-light-system"
          value={mode}
          label="Mode"
          onChange={handleChange}
        >
          <MenuItem value='light'>
            <Box sx={{ display:'flex', alignItems:'center', gap:1 }}>
              <LightModeIcon/> Light
            </Box>
          </MenuItem>
          <MenuItem value='dark'>
            <Box sx={{ display:'flex', alignItems:'center', gap:1 }}>
              <DarkModeOutlinedIcon/> Dark
            </Box>
          </MenuItem>
          <MenuItem value='system'>
            <Box sx={{ display:'flex', alignItems:'center', gap:1 }}>
              <SettingsBrightnessIcon/> System
            </Box>
          </MenuItem>
        </Select>
      </FormControl>
    );
  }
  return (
    <Container disableGutters maxWidth={false} sx={ { height:'100vh', backgroundColor:'primary.main' } }>
      <Box sx={ {
        backgroundColor:'primary.light',
        width:'100%',
        height: (theme) => theme.trello.appBarHeight,
        display:'flex',
        alignItems:'center'
      } }>
        <SelectDarkLight/>
      </Box>
      <Box sx={ {
        backgroundColor:'primary.dark',
        width:'100%',
        height: (theme) => theme.trello.boardBarHeight,
        display:'flex',
        alignItems:'center'
      } }>
        Board app
      </Box>
      <Box sx={ {
        backgroundColor:'primary.main',
        width:'100%',
        height:(theme) => `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
        display:'flex',
        alignItems:'center'
      } }>
        Board Content
      </Box>
    </Container>
  )
}

export default App

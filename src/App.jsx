
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useColorScheme } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import LightModeIcon from '@mui/icons-material/LightMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import Box from '@mui/material/Box';
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
    <>
      <SelectDarkLight/>
      <hr/>
      <div>Quỳnh dep</div>
      <Typography variant="h1" color='text.secondary'>
        h1. Heading
      </Typography>


      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </>
  )
}

export default App

import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

import { teal, orange, deepOrange, cyan } from '@mui/material/colors'
import { BorderColor } from '@mui/icons-material';

// Create a theme instance.
const theme = extendTheme({
  trello:{
    appBarHeight:'58px',
    boardBarHeight:'60px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary:deepOrange
      }
    }
  },
  dark: {
    palette: {
      primary: cyan,
      secondary:orange
    }
  },
  components:{
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '8px',
            height:'8px'
          },
          '*::-webkit-scrollbar-thumb': {
            background: '#bdc3c7',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            background: '#95a5a6'
          }
        }
      }
    },
    MuiButton:{
      styleOverrides:{
        root:{
          textTransform:'none'
        }
      }
    },
    MuiInputLabel:{
      styleOverrides:{
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          fontSize:'0.875rem'
        })
      }
    },
    MuiOutlinedInput:{
      styleOverrides:{
        root: ({ theme }) => {
          return {
            color: theme.palette.primary.main,
            fontSize:'0.875rem',
            '.MuiOutlinedInput-notchedOutline':{
              borderColor: theme.palette.primary.light
            },
            '&:hover':{
              '.MuiOutlinedInput-notchedOutline':{
                borderColor: theme.palette.primary.main
              }
            },
            //setting khi focus vào ô input không làm đậm border
            // '& fieldset':{
            //   borderWidth:'1px !important'
            // }
          }
        }
      }
    }
  }
  // ...other properties
});
export default theme

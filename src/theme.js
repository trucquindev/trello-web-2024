import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
// Create a theme instance.
const theme = extendTheme({
  trello:{
    appBarHeight:'58px',
    boardBarHeight:'60px'
  },
  colorSchemes: {
    // light: {},
    // dark: {}
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
            background: '#dcdde1',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            background: 'white'
          }
        }
      }
    },
    MuiButton:{
      styleOverrides:{
        root:{
          textTransform:'none',
          borderWidth:'0.5px',
          '&:hover':{ borderWidth:'0.5px' }
        }
      }
    },
    MuiInputLabel:{
      styleOverrides:{
        root: { fontSize:'0.875rem' }
      }
    },
    MuiOutlinedInput:{
      styleOverrides:{
        root: ({ theme }) => {
          return {
            // color: theme.palette.primary.main,
            fontSize:'0.875rem',
            // '.MuiOutlinedInput-notchedOutline':{
            //   borderColor: theme.palette.primary.light
            // },
            // '&:hover':{
            //   '.MuiOutlinedInput-notchedOutline':{
            //     borderColor: theme.palette.primary.main
            //   }
            // },
            //setting khi focus vào ô input không làm đậm border
            '& fieldset':{ borderWidth:'0.5px !important' },
            '&:hover fieldset':{ borderWidth:'1px !important' },
            '&.Mui-focused fieldset':{ borderWidth:'1px !important' }
          }
        }
      }
    }
  }
  // ...other properties
});
export default theme

import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from './theme'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// cấu hình MUI dialog
import { ConfirmProvider } from 'material-ui-confirm'
ReactDOM.createRoot(document.getElementById('root')).render(
  <CssVarsProvider theme={theme}>
    <ConfirmProvider defaultOptions={{
      allowClose:false,
      dialogProps:{ maxWidth:'xs' },
      confirmationButtonProps:{ color: 'secondary', variant:'outlined' },
      cancellationButtonProps:{ color: 'inherit' },
    }}>
      <CssBaseline />  {/* Add this line */}
      <App />
      {/* cấu hình react toastify */}
      <ToastContainer position="bottom-left" theme="colored"/>
    </ConfirmProvider>
  </CssVarsProvider>
)

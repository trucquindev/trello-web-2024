import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from './theme'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// cấu hình Redux
import { Provider } from 'react-redux'
import { store } from '~/redux/store.js'
// cấu hình MUI dialog
import { ConfirmProvider } from 'material-ui-confirm'
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { injectStore } from './untils/authorizeAxios.js'
// cau hinh socketio
import { io } from 'socket.io-client'
import { API_ROOT } from './untils/constrain.js';
export const socketInstance = io(API_ROOT)
const persistor = persistStore(store)

// kỹ thuật injectStore
// Giai phap: Inject store : kỹ thuật cần khi sử dụng redux store ở các file ngoài phạm vi component nhu file authorization hien tai
injectStore(store)
ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter basename='/'>
        <CssVarsProvider theme={theme}>
          <ConfirmProvider defaultOptions={{
            allowClose: false,
            dialogProps: { maxWidth: 'xs' },
            confirmationButtonProps: { color: 'secondary', variant: 'outlined' },
            cancellationButtonProps: { color: 'inherit' },
          }}>
            <GlobalStyles styles={{ a: { textDecoration: 'none' } }} />  {/* Add this line */}
            <CssBaseline />  {/* Add this line */}
            <App />
            {/* cấu hình react toastify */}
            <ToastContainer position="bottom-left" theme="colored" />
          </ConfirmProvider>
        </CssVarsProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
)

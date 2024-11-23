
import Board from './pages/Boards/_id'
import { Route, Routes, Navigate, Outlet } from 'react-router-dom'
import Settings from '~/pages/Settings/Settings'
import NotFound from '~/pages/404/NotFound'
import Auth from '~/pages/Auth/Auth'
import AccountVerification from '~/pages/Auth/AccountVerification'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { useSelector } from 'react-redux'
// Xac dinh route nao can dang nhap xong moi duoc truy cap
const ProtechtedRoutes = ({ user }) => {
  if (!user) return <Navigate to={'/login'} replace />
  return <Outlet />
}
function App() {
  const currentUser = useSelector(selectCurrentUser)
  return (
    <Routes>
      <Route path='/' element={
        <Navigate to='/boards/66fae02074e6f32c05f5201f' replace />
      } />
      <Route element={<ProtechtedRoutes user={currentUser} />}>
        <Route path='/boards/:boardId' element={<Board />} />

        {/* user setting */}
        <Route path='/settings/account' element={<Settings />} />
        <Route path='/settings/security' element={<Settings />} />
      </Route>
      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth />} />
      <Route path='/accounts/verification' element={<AccountVerification />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App

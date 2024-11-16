import { useEffect, useState } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import PageLoadingSpiner from '~/Combonents/Loading/pageLoadingSpiner'
import { verifyUserAPI } from '~/apis'
const AccountVerification = () => {
  // lấy giá trị email và token url
  const [searchParams] = useSearchParams()
  // const email = searchParams.get('email')
  // const token = searchParams.get('token')
  // lay du lieu tu url
  const { email, token } = Object.fromEntries([...searchParams])
  // tao 1 bien state de biet verify hay chua
  const [verified, setVerified] = useState(false)
  // goi api de verify tai khoan
  useEffect(() => {
    if (email && token) {
      verifyUserAPI({ email: email, token: token }).then(() => setVerified(true))
    }
  }, [email, token])
  // Neu url thieu token hoac email thi redirect sang trang 404
  if (!email || !token) return <Navigate to='/404' />
  // Neu verify chua xong thi redirect hien trang loading
  if (!verified) return <PageLoadingSpiner caption='Verifing your account ...' />
  // Neu verify thanh cong thi redirect sang trang login

  return (
    <Navigate to={`/login?verifiedEmail=${email}`} />
  )
}

export default AccountVerification
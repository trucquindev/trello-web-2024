import { Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
const PageLoadingSpiner = ({ caption }) => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress size="5rem" color="secondary" />
      <Typography variant="h5">{caption}</Typography>
    </Box>
  )
}

export default PageLoadingSpiner
import { Container } from '@mui/material'
import { Box } from '@mui/material'
import AppBar from '../../Combonents/AppBar'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'
const Board = () => {
  return (
    <Container disableGutters maxWidth={false} sx={ { height:'100vh', backgroundColor:'primary.main' } }>
      <AppBar/>
      <BoardBar/>
      <BoardContent/>
    </Container>
  )
}

export default Board

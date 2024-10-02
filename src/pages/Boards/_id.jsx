import { Container } from '@mui/material'
import AppBar from '~/Combonents/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '~/apis/mock-data'
import { useState, useEffect } from 'react'
import { fetchBoardDetailsApi } from '~/apis'
import { mockData } from '~/apis/mock-data'
const Board = () => {

  const [board, setBoard] = useState(null)
  useEffect(() => {
    // goi api
    const boardId ='66fae02074e6f32c05f5201f'
    fetchBoardDetailsApi(boardId)
      .then(board => {
        setBoard(board)
      })
  }, [])
  return (
    <Container disableGutters maxWidth={false} sx={ { height:'100vh' } }>
      <AppBar/>
      <BoardBar board={mockData.board} />
      <BoardContent board={mockData.board} />
    </Container>
  )
}

export default Board

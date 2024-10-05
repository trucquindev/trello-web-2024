import { Container } from '@mui/material'
import AppBar from '~/Combonents/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { createNewColumnAPI, createNewCardAPI, updateBoardDetailsApi } from '~/apis'
import { generatePlaceholderCard } from '~/untils/formatters'
import { isEmpty } from 'lodash'
// import { mockData } from '~/apis/mock-data'
import { useState, useEffect } from 'react'
import { fetchBoardDetailsApi } from '~/apis'
const Board = () => {
  const [board, setBoard] = useState(null)
  useEffect(() => {
    // goi api
    const boardId ='66fae02074e6f32c05f5201f'
    fetchBoardDetailsApi(boardId)
      .then(board => {
        // khi refesh trang web check column rong de them placeHolderCard
        board.columns.forEach(column => {
          if (isEmpty(column.cards)) {
            column.cards = [generatePlaceholderCard(column)]
            column.cardOrderIds = [generatePlaceholderCard(column)._id]
          }
        })
        setBoard(board)
      })
  }, [])
  //function call api create column
  const createNewColumn = async(newColumnData) => {
    const createdColumn= await createNewColumnAPI({ ...newColumnData, boardId: board._id })
    // tao 1 column rong de keo tha
    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

    //cap nhat state board
    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
    return
  }

  //function call api create card
  const createNewCard = async(newCardData) => {
    const createdCard= await createNewCardAPI({ ...newCardData, boardId: board._id })
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)
    if (columnToUpdate) {
      columnToUpdate.cards.push(createdCard)
      columnToUpdate.cardOrderIds.push(createdCard._id)
    }
    setBoard(newBoard)
    return
  }

  // xử lí kéo thả column and update API
  const moveColumns = async(dndOrderedColumns) => {
    //update dữ liệu board
    const dndOrderedColumnsIds= dndOrderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns= dndOrderedColumns
    newBoard.columnOrderIds= dndOrderedColumnsIds
    setBoard(newBoard)

    //goi api update
    await updateBoardDetailsApi(newBoard._id, { columnOrderIds: newBoard.columnOrderIds })
    return
  }
  return (
    <Container disableGutters maxWidth={false} sx={ { height:'100vh' } }>
      <AppBar/>
      <BoardBar board={board} />
      <BoardContent board={board}
        createNewColumn = {createNewColumn}
        createNewCard = {createNewCard}
        moveColumns= {moveColumns}/>
    </Container>
  )
}

export default Board

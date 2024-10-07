import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Container } from '@mui/material'
import AppBar from '~/Combonents/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { createNewColumnAPI, createNewCardAPI, updateBoardDetailsApi, updateColumnDetailsApi, moveCardDifferentColumnAPI } from '~/apis'
import { mapOder } from '~/untils/sort'
import { generatePlaceholderCard } from '~/untils/formatters'
import { isEmpty } from 'lodash'
import CircularProgress from '@mui/material/CircularProgress';
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
        // sap xep thu tu cac column o day truoc khi dua du lieu xuong ben duoi cac component
        board.columns = mapOder(board?.columns, board?.columnOrderIds, '_id')
        board.columns.forEach(column => {
        // khi refesh trang web check column rong de them placeHolderCard
          if (isEmpty(column.cards)) {
            column.cards = [generatePlaceholderCard(column)]
            column.cardOrderIds = [generatePlaceholderCard(column)._id]
          }
          else {
            // sap xep card theo orderIds truoc khi dua xuong
            column.cards = mapOder(column.cards, column.cardOrderIds, '_id')
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
  const moveColumns = (dndOrderedColumns) => {
    //update dữ liệu board
    const dndOrderedColumnsIds= dndOrderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns= dndOrderedColumns
    newBoard.columnOrderIds= dndOrderedColumnsIds
    setBoard(newBoard)

    //goi api update
    updateBoardDetailsApi(newBoard._id, { columnOrderIds: newBoard.columnOrderIds })
    return
  }

  // goi api update mang cardOderIds cua column chua no (thay doi vi tri trong mang)
  const moveCardInTheSameColumn = (dndOrderedCard, dndOrderedCardIds, columnId) => {
    //update dữ liệu board
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards= dndOrderedCard
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    setBoard(newBoard)
    //goi api update
    updateColumnDetailsApi(columnId, { cardOrderIds: dndOrderedCardIds })
  }
  //cap nhat cardOrderIds trong column ban dau
  //cap nhat cardOrderIds trong column moi
  //cap nhat columnId cua card duoc them vao column moi
  //currentCardId card ban dau
  const moveCardToDifferentColumn = (currentCardId, prevColumnId, nexColumnId, dndOrderedColumns) => {
    //update dữ liệu board
    const dndOrderedColumnsIds= dndOrderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns= dndOrderedColumns
    newBoard.columnOrderIds= dndOrderedColumnsIds
    setBoard(newBoard)

    //call api
    moveCardDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds:dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds,
      nexColumnId,
      nexCardOrderIds:dndOrderedColumns.find(c => c._id === nexColumnId)?.cardOrderIds,
    })
  }

  // khi chua load duoc board
  if (!board)
    return (
      <Box sx={{ width:'100vw',
        height:'100vh',
        display: 'flex',
        flexDirection:'column',
        gap:2,
        alignItems: 'center',
        justifyContent:'center'
      }}>
        <CircularProgress size="5rem" color='secondary'/>
        <Typography variant="h5">Loading board...</Typography>
      </Box>
    )
  return (
    <Container disableGutters maxWidth={false} sx={ { height:'100vh' } }>
      <AppBar/>
      <BoardBar board={board} />
      <BoardContent board={board}
        createNewColumn = {createNewColumn}
        createNewCard = {createNewCard}
        moveColumns= {moveColumns}
        moveCardInTheSameColumn= {moveCardInTheSameColumn}
        moveCardToDifferentColumn= {moveCardToDifferentColumn}/>
    </Container>
  )
}

export default Board

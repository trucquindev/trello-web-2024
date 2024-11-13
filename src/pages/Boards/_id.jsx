import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import AppBar from '~/Combonents/AppBar/AppBar';
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent';
import {
  updateBoardDetailsApi,
  updateColumnDetailsApi,
  moveCardDifferentColumnAPI
} from '~/apis';
import CircularProgress from '@mui/material/CircularProgress';
// import { mockData } from '~/apis/mock-data'
import { useEffect } from 'react';
import { fetchBoardDetailsApi, updateCurrentActiveBoard, selectCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux';
import { cloneDeep } from 'lodash'
const Board = () => {
  const dispatch = useDispatch();

  // const [board, setBoard] = useState(null);
  const board = useSelector(selectCurrentActiveBoard)
  useEffect(() => {
    const boardId = '66fae02074e6f32c05f5201f';
    // goi api
    dispatch(fetchBoardDetailsApi(boardId))
  }, [dispatch]);
  // function xoa card

  // xử lí kéo thả column and update API
  const moveColumns = (dndOrderedColumns) => {
    //update dữ liệu board
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    dispatch(updateCurrentActiveBoard(newBoard))

    //goi api update
    updateBoardDetailsApi(newBoard._id, {
      columnOrderIds: newBoard.columnOrderIds,
    });
    return;
  };

  // goi api update mang cardOderIds cua column chua no (thay doi vi tri trong mang)
  const moveCardInTheSameColumn = (
    dndOrderedCard,
    dndOrderedCardIds,
    columnId
  ) => {
    if (dndOrderedCardIds[0].includes('placeholder-card'))
      dndOrderedCardIds.shift();
    //update dữ liệu board
    const newBoard = cloneDeep(board);
    const columnToUpdate = newBoard.columns.find(
      (column) => column._id === columnId
    );
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCard;
      columnToUpdate.cardOrderIds = dndOrderedCardIds;
    }
    dispatch(updateCurrentActiveBoard(newBoard))
    //goi api update
    updateColumnDetailsApi(columnId, { cardOrderIds: dndOrderedCardIds });
  };
  //cap nhat cardOrderIds trong column ban dau
  //cap nhat cardOrderIds trong column moi
  //cap nhat columnId cua card duoc them vao column moi
  //currentCardId card ban dau
  const moveCardToDifferentColumn = (
    currentCardId,
    prevColumnId,
    nexColumnId,
    dndOrderedColumns
  ) => {
    //update dữ liệu board
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    dispatch(updateCurrentActiveBoard(newBoard))

    //call api
    let prevCardOrderIds = dndOrderedColumns.find(
      (c) => c._id === prevColumnId
    )?.cardOrderIds;
    // xu li van de khi keo card cuoi cung ra khoi column, la con cai placeholder en xoa no di
    if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = [];
    moveCardDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nexColumnId,
      nexCardOrderIds: dndOrderedColumns.find((c) => c._id === nexColumnId)
        ?.cardOrderIds,
    });
  };

  // khi chua load duoc board
  if (!board)
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
        <Typography variant="h5">Loading board...</Typography>
      </Box>
    );
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}

        moveColumns={moveColumns}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardToDifferentColumn={moveCardToDifferentColumn}
      />
    </Container>
  );
};

export default Board;

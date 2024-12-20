import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authorizedAxiosInstance from '~/untils/authorizeAxios';
import { API_ROOT } from '~/untils/constrain';
import { mapOder } from '~/untils/sort';
import { generatePlaceholderCard } from '~/untils/formatters';
import { isEmpty } from 'lodash';
const initialState = {
  currentActiveBoard: null,
};
// các hình đồng gọi api bất đồng bộ và cập nhật dữ liệu vào redux , duubgf middleware createAsysncThunk di kem voi extrareducer
export const fetchBoardDetailsApi = createAsyncThunk(
  'activeBoard/fetchBoardDetailsApi',
  async (boardId) => {
    // Gọi API để lấy thông tin của board
    const response = await authorizedAxiosInstance.get(
      `${API_ROOT}/v1/boards/${boardId}`
    );
    return response.data;
  }
);
// Khởi tạo một cái slice trong kho lưu trữ - Redux Store
export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  // Reducers : Nơi xử lí dữ liệu đồng bộ
  reducers: {
    updateCurrentActiveBoard: (state, action) => {
      //action.payload là chuẩn đặt tên nhận dữ liệu vào reducer, ở đây chúng ta gán nó ra  biến có nghĩa hơn
      const fullBoard = action.payload;

      // xử lí dữ liệu nếu cần thiết
      //...

      //update dữ liệu của currentActiveBoard

      state.currentActiveBoard = fullBoard;
    },
    updateCardInBoard: (state, action) => {
      //update nested data
      const incomingCard = action.payload;

      // tim tu board > column > card
      const column = state.currentActiveBoard.columns.find(
        (i) => i._id === incomingCard.columnId
      );
      if (column) {
        const card = column.cards.find((i) => i._id === incomingCard._id);
        if (card) {
          Object.keys(incomingCard).forEach((key) => {
            card[key] = incomingCard[key];
          });
        }
      }
    },
  },
  //extraReducers: noi xu li du lieu bat dong bo
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailsApi.fulfilled, (state, action) => {
      // sau khi gọi API thành công, update state
      // action.payload chinh la respone.data khi goi api thanh cong bang axios o tren
      let board = action.payload;
      // thanh vien trong board se la gop lai 2 mang owners va members
      board.FE_allUsers = board.owners.concat(board.members);

      // xử lí dữ liệu nếu cần thiết
      // sap xep thu tu cac column o day truoc khi dua du lieu xuong ben duoi cac component
      board.columns = mapOder(board?.columns, board?.columnOrderIds, '_id');
      board.columns.forEach((column) => {
        // khi refesh trang web check column rong de them placeHolderCard
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)];
          column.cardOrderIds = [generatePlaceholderCard(column)._id];
        } else {
          // sap xep card theo orderIds truoc khi dua xuong
          column.cards = mapOder(column.cards, column.cardOrderIds, '_id');
        }
      });

      //update dữ liệu của currentActiveBoard

      state.currentActiveBoard = board;
    });
  },
  // Thiết lập middleware cho thông tin mới nhất của board
});

// Actions : là nơi dành cho các components bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
export const { updateCurrentActiveBoard, updateCardInBoard } =
  activeBoardSlice.actions;

// Selectors: là nơi dành cho các components bên dưới gọi bằng hooks useSelectỏ () để lấy dữ liệu tử kho redux ra xử dụng
export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard;
};
// tên của file là activeBoardSlide nhưng phải export ra cái reducer
export const activeBoardReducer = activeBoardSlice.reducer;

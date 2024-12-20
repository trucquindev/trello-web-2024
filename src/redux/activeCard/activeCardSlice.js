import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  currentActiveCard: null,
};

// Khởi tạo một cái slice trong kho lưu trữ - Redux Store
export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState,
  // Reducers : Nơi xử lí dữ liệu đồng bộ
  reducers: {
    clearCurrentActiveCard: (state) => {
      //action.payload là chuẩn đặt tên nhận dữ liệu vào reducer, ở đây chúng ta gán nó ra  biến có nghĩa hơn
      state.currentActiveCard = null;
    },
    updateCurrentActiveCard: (state, action) => {
      const fullCard = action.payload;

      state.currentActiveCard = fullCard;
    },
  },
  //extraReducers: noi xu li du lieu bat dong bo
  extraReducers: (builder) => {},
  // Thiết lập middleware cho thông tin mới nhất của board
});

// Actions : là nơi dành cho các components bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
export const { clearCurrentActiveCard, updateCurrentActiveCard } =
  activeCardSlice.actions;

// Selectors: là nơi dành cho các components bên dưới gọi bằng hooks useSelectỏ () để lấy dữ liệu tử kho redux ra xử dụng
export const selectCurrentActiveCard= (state) => {
  return state.activeCard.currentActiveCard;
};
// tên của file là activeBoardSlide nhưng phải export ra cái reducer
export const activeCardReducer = activeCardSlice.reducer;

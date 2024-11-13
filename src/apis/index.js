import axios from 'axios'
import { API_ROOT } from '~/untils/constrain'

//boardApi
// da them vao redux

// export const fetchBoardDetailsApi= async(boardId) => {
//   const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
//   return response.data
// }

//updateBoard
export const updateBoardDetailsApi= async(boardId, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
  return response.data
}

//updateBoard
export const moveCardDifferentColumnAPI= async(updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/supports/moving_card`, updateData)
  return response.data
}

//columnApi
export const createNewColumnAPI= async(dataColumn) => {
  const response = await axios.post(`${API_ROOT}/v1/columns/`, dataColumn)
  return response.data
}
//deleteColumn
export const deleteColumnAPI= async(columnId) => {
  const response = await axios.delete(`${API_ROOT}/v1/columns/${columnId}`)
  return response.data
}
//updatColumn
export const updateColumnDetailsApi= async(columnId, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
  return response.data
}

//cardApi
export const createNewCardAPI= async(dataCard) => {
  const response = await axios.post(`${API_ROOT}/v1/cards/`, dataCard)
  return response.data
}

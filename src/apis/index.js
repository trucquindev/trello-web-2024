import axios from 'axios'
import { API_ROOT } from '~/untils/constrain'

//boardApi

export const fetchBoardDetailsApi= async(boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  return response.data
}

//columnApi
export const createNewColumnAPI= async(dataColumn) => {
  const response = await axios.post(`${API_ROOT}/v1/columns/`, dataColumn)
  return response.data
}

//cardApi
export const createNewCardAPI= async(dataCard) => {
  const response = await axios.post(`${API_ROOT}/v1/cards/`, dataCard)
  return response.data
}
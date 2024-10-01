import axios from 'axios'
import { API_ROOT } from '~/untils/constrain'
export const fetchBoardDetailsApi= async(boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  console.log(response);
  return response.data
}
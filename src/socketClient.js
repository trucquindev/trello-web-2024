// cau hinh socketio
import { io } from 'socket.io-client';
import { API_ROOT } from './untils/constrain.js';
export const socketInstance = io(API_ROOT);

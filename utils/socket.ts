import { io } from "socket.io-client";


const SOCKET_URL = "https://karrie-nonperceptional-raiden.ngrok-free.dev";

const socket = io(SOCKET_URL, { 
  transports:['websocket', 'polling']
})

export default socket
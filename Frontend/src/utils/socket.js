import io from "socket.io-client";
import BACKEND_URL from "./constant"
export const createSocketConnection=()=>{
    // connect to backend system
    return io(BACKEND_URL)
}
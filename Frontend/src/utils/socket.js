import io from "socket.io-client";
import BACKEND_URL from "./constant"
export const createSocketConnection=()=>{
    // connect to backend system
    if (location.hostname === "localhost") {
        return io("http://localhost:3000")
    }
    else {
        return io("/", { path: "/api/socket.io" })
    }
}
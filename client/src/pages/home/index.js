import { useSelector } from "react-redux"
import ChatArea from "./components/chat"
import Header from "./components/header"
import Sidebar from "./components/sidebar"
import { io } from "socket.io-client";
import { useEffect } from "react";

const socket = io('http://localhost:5000')

function Home() {
    const { selectedChat, user } = useSelector(state => state.userReducer)

    useEffect(() => {
        if (user) {
            socket.emit('join-room', user._id);
        }
    }, [user])

    return (
        <div className="home-page">
            <div className="main-content">
                <Header></Header>
                <Sidebar></Sidebar>
                {selectedChat && <ChatArea socket={socket}></ChatArea>}
            </div>
        </div>
    )
}

export default Home
import { useSelector } from "react-redux"
import ChatArea from "./components/chat"
import Header from "./components/header"
import Sidebar from "./components/sidebar"
import { io } from "socket.io-client";
import { useEffect } from "react";

function Home() {
    const { selectedChat, user } = useSelector(state => state.userReducer)
    const socket = io('http://localhost:5000')

    useEffect(() => {
        if (user) {
            socket.emit('join-room', user._id);
            socket.emit('send-message', {text: 'Hi Mery! Hello World', receiver: '69b32a15642b8edbed8aa6d7'})
            socket.on('received-message', data => {
                console.log(data)
            })
        }
    }, [user])

    return (
        <div className="home-page">
            <div className="main-content">
                <Header></Header>
                <Sidebar></Sidebar>
                {selectedChat && <ChatArea></ChatArea>}
            </div>
        </div>
    )
}

export default Home
import { useSelector, useDispatch } from "react-redux"
import toast from 'react-hot-toast';
import { createNewChat } from "../../../apiCalls/chat";
import { showLoader, hideLoader } from '../../../redux/loaderSlice';
import { setAllchats, setSelectedChat } from '../../../redux/userSlice';
import moment from 'moment';

function UsersList({searchKey}) {
    const { allUsers, allChats, user: currentUser, selectedChat } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const startNewChat = async (searchedUserId) => {
        let response = null;
        try {
            dispatch(showLoader());
            response = await createNewChat([currentUser._id, searchedUserId])
            dispatch(hideLoader())

            if (response.success) {
                toast.success(response.message);
                const newChat = response.data;
                const updatedChat = [...allChats, newChat]
                dispatch(setAllchats(updatedChat))
                dispatch(setSelectedChat(newChat))
            }
        } catch (error) {
            toast.error(response.message)
            dispatch(hideLoader())
        }
    }

    const openChat = (selectedUserId) => {
        
        const chat = allChats.find(chat =>
            chat.members.map(m => m._id).includes(currentUser._id) &&
            chat.members.map(m => m._id).includes(selectedUserId)
        )

        if (chat) {            
            dispatch(setSelectedChat(chat))
        }
    }
    
    const isSelectedChat = (user) => {
        if(selectedChat) {
            return selectedChat.members.map(m => m._id).includes(user._id)
        }
        return false
    }

    const getLastMessage = (userId) => {
        const chat = allChats.find(chat => chat.members.map(m => m._id).includes(userId))
        if (!chat || !chat?.lastMessage) {
            return '';
        } else {
            const msgPrefix = chat?.lastMessage?.sender === currentUser._id ? "You: " : '';
            return msgPrefix + chat?.lastMessage?.text?.substring(0, 25);
        }
    }

    const getLastMessageTimestamp = (userId) => {
        const chat = allChats.find(chat => chat.members.map(m => m._id).includes(userId))
        if (!chat && chat?.lastMessage) {
            return '';
        } else {
            return moment(chat?.lastMessage?.createdAt).format('hh:mm A')
        }
    }

    const formatName = (user) => {
        let fname = user.firstname.at(0).toUpperCase() + user.firstname.slice(1).toLowerCase();
        let lname = user.lastname.at(0).toUpperCase() + user.lastname.slice(1).toLowerCase();
        return fname + ' ' + lname;
    }

    const getUnreadMessageCount = (userId) => {
        const chat = allChats.find(chat => chat.members.map(m => m._id).includes(userId))

        if (chat && chat.unreadMessageCount && chat.lastMessage.sender !== currentUser._id) {
            return <div className="unread-message-counter">{chat.unreadMessageCount}</div>            
        } else {
            return "";
        }
    }

    const getData = () => {
        if(searchKey === ""){
            return allChats;
        }else{
            return allUsers.filter(user => {
                return user.firstname?.toLowerCase().includes(searchKey?.toLowerCase()) ||
                    user.lastname?.toLowerCase().includes(searchKey?.toLowerCase());
            });
        }
    }

    return (
       getData()
        .map((obj) => {
        let user = obj;
        if (obj.members) {
            user = obj.members.find( mem => mem._id !== currentUser._id)
        }
        return(
            <div className="user-search-filter" onClick={() => openChat(user._id)} key={user._id}>
            <div className={isSelectedChat(user)? "selected-user" : "filtered-user"}>
                <div className="filter-user-display">
                    {user.profilePic && <img src={user.profilePic} alt="Profile Pic" className="user-profile-image"/>}
                    {!user.profilePic && <div className={isSelectedChat(user) ? "user-selected-avatar" : "user-default-avatar"}>
                        {
                            user.firstname.charAt(0).toUpperCase() + 
                            user.lastname.charAt(0).toUpperCase()
                        }
                    </div>}
                    <div className="filter-user-details">
                        <div className="user-display-name">{formatName(user)}
                            <div className="user-display-email">{getLastMessage(user._id) || user.email}</div>
                        </div>
                        <div>
                            {getUnreadMessageCount(currentUser._id)}
                            <div className="last-message-timestamp">{getLastMessageTimestamp(user._id)}</div>
                        </div>
                        { !allChats.find(chat => chat.members.map(m => m._id).includes(user._id)) &&
                            <div className="user-start-chat">
                                <button className="user-start-chat-btn" onClick={() => startNewChat(user._id)}>
                                    Start Chat
                                </button>
                            </div>
                        }
                    </div>
                </div>                        
            </div>
        </div>
        );
    })
    )
}

export default UsersList
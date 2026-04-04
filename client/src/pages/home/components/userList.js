import { useSelector, useDispatch } from "react-redux"
import toast from 'react-hot-toast';
import { createNewChat } from "../../../apiCalls/chat";
import { showLoader, hideLoader } from '../../../redux/loaderSlice';
import { setAllchats } from '../../../redux/userSlice';

function UsersList({searchKey}) {
    const { allUsers, allChats, user: currentUser } = useSelector((state) => state.userReducer);
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
            }
        } catch (error) {
            toast.error(response.message)
            dispatch(hideLoader())
        }
    }
    return (
        allUsers.filter(user => {
            return (
                (
                    (user.firstname.toLowerCase().includes(searchKey.toLowerCase()) || 
                    user.lastname.toLowerCase().includes(searchKey.toLowerCase())) && searchKey
                ) || 
                (
                    (allChats.some(chat => chat.members.includes(user._id)))
                )
                
            )
        }).map((user) => {
        return(
            <div class="user-search-filter">
            <div class="filtered-user">
                <div class="filter-user-display">
                    {user.profilePic && <img src={user.profilePic} alt="Profile Pic" class="user-profile-image"/>}
                    {!user.profilePic && <div class="user-default-profile-pic">
                        {
                            user.firstname.charAt(0).toUpperCase() + 
                            user.lastname.charAt(0).toUpperCase()
                        }
                    </div>}
                    <div class="filter-user-details">
                        <div class="user-display-name">{user.firstname + ' ' + user.lastname}
                            <div class="user-display-email">{user.email}</div>
                        </div>
                        { !allChats.find(chat => chat.members.includes(user._id)) &&
                            <div class="user-start-chat">
                                <button class="user-start-chat-btn" onClick={() => startNewChat(user._id)}>
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
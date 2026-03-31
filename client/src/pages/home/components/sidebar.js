import { useState } from "react";
import Search from "./search";
import UsersList from "./userList";

function Sidebar() {
    const [searchKey, setSearchKey] = useState('');
    return (
        <div className="app-sidebar">
            <Search 
                searchKey={searchKey} 
                setSearchKey={setSearchKey}>
            </Search>
            <UsersList searchKey={searchKey}></UsersList>
        </div>
    )
}

export default Sidebar;
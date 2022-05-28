import React from 'react'
import "./Sidebar.css"
import SidebarChat from './SidebarChat';
import ChatIcon from '@mui/icons-material/Chat';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
// This is for being able to edit the material ui icons (after  adding this the properties of the button came up in the material ui icons)

import { Avatar } from '@mui/material';

function Sidebar() {
  return (
    <div className='sidebar'>
      <div className="sidebar_header">
        <Avatar src="/images/ferrari.jpg" />
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchIcon />
          <input type="text" placeholder='Search or start new Chat'/>
        </div>
      </div>

       <div className="sidebar_chats">
         <SidebarChat />
         <SidebarChat />
         <SidebarChat />
         <SidebarChat />
       </div>
    </div>
  )
}

export default Sidebar
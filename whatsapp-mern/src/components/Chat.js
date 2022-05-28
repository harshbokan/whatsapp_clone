import { Avatar, IconButton } from '@mui/material'
import React ,{useState} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import "./Chat.css"

import axios from '../axios';

function Chat({ messages }) {

  const [input, setInput] = useState("");
  
  const sendMessage= async (e) =>{
    e.preventDefault();

    await axios.post('/messages/new', {
      name: "You",
      timestamp: "Just Now",
      received: true,
      message: input,
    });

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar />
        <div className="chat_headerInfo">
          <h3>Room Name</h3>
          <p>Last seen at ...</p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat_body">
        {
          messages.map(message => (
            <p className={`chat_message ${message.received && "chat_receiver"}`}>
              <span className="chat_name">{message.name}</span>
              {message.message}
              <span className="chat_timestamp">
                {message.timestamp}
              </span>
            </p>
          ))
        }

        {/*

        <p className='chat_message chat_receiver'>
          <span className="chat_name">You</span>
          This is a message
          <span className="chat_timestamp">
            {new Date().toUTCString()}
          </span>
        </p> */}

      </div>

      <div className="chat_footer">
        <InsertEmoticonIcon />
        <form>
          <input value={input} onChange={(e)=> setInput(e.target.value)} type="text" placeholder='Type your message!' />
          <button onClick={sendMessage} type="submit">Send a Message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  )
}

export default Chat
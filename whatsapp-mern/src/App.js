import './App.css';
import Sidebar from './components/Sidebar';
import Chat from "./components/Chat";
import { useEffect ,useState } from 'react';
import Pusher from 'pusher-js';
import axios from "./axios"

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(()=> {
    // fetching the latest message
    axios.get("/messages/sync").then((response)=>{
      setMessages(response.data);
    });
  }, []);

  useEffect(()=> {
    const pusher = new Pusher('6f67abcc6ba650065302', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(latestMessage) {
      // alert(JSON.stringify(latestMessage));
      setMessages([...messages, latestMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
    
  }, [messages]);

  console.log(messages);

  return (
    <div className="app">
    <div className="app_body">
      <Sidebar />
      <Chat messages={messages} />
    </div>
    </div>
  );
}

export default App;

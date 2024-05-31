import './chatbot.css'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import SideBar from "./SideBar";
import Chat from './chat';
import CodeTab from './tabs';
import React, { useState } from 'react';
import AuthService from '../authService';
import { ChatTextarea } from './chat-input';

function ChatBot() {
  const [result, setResult] = useState(null);

  const handleResult = (data) => {
    setResult(data);
  };
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.startsWith('/dashboard')) {
      AuthService.logout();
    }
  }, [location]);
  return (
    <div className='chatbot'>
      <SideBar />
      <div className='code-area'>
        <Chat onSubmit={handleResult}/>
        <CodeTab result1={result}/>
      </div>
      
    </div>
      
    
  );
}

export default ChatBot;

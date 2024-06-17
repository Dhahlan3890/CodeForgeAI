import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AuthService from '../authService';
import SideBar from './SideBar';
import Chat from './chat';
import CodeTab from './tabs';

function ChatBot() {
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const location = useLocation();

  const handleResult = (data) => {
    setResult(data);
  };

  const handleHistory = (data) => {
    setHistory((prevHistory) => [...prevHistory, data]);
  };

  useEffect(() => {
    if (!location.pathname.startsWith('/dashboard')) {
      AuthService.logout();
    }
  }, [location]);

  return (
    <div className='chatbot'>
      <SideBar history_store={history} />
      <div className='code-area'>
        <Chat onSubmit={handleResult} onHistory={handleHistory} />
        <CodeTab result1={result} />
      </div>
    </div>
  );
}

export default ChatBot;

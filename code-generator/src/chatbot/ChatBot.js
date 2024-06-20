import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AuthService from '../authService';
import SideBar from './SideBar';
import Chat from './chat';
import CodeTab from './tabs';
import MobileNav from './MobileNavBar';

function ChatBot() {
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [open, setOpen] = useState(window.innerWidth < 960);
  const [darkMode, setDarkMode] = useState(false);
  const [advancedMode, setAdvancedMode] = useState(false)
  const location = useLocation();

  React.useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth < 960);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleAdvancedMode = () => {
    setAdvancedMode(!advancedMode)
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleResult = (data) => {
    setResult(data);
  };

  const handleHistory = (data) => {
    setHistory((prevHistory) => [...prevHistory, data]);
  };

  // useEffect(() => {
  //   if (!location.pathname.startsWith('/dashboard')) {
  //     AuthService.logout();
  //   }
  // }, [location]);

  return (
    <div className="chatbot">
      {open ? <MobileNav history={history} darkMode={darkMode} toggleDarkMode={toggleDarkMode} advancedMode={advancedMode} toggleAdvancedMode= {toggleAdvancedMode} /> : <SideBar history_store={history} darkMode={darkMode} toggleDarkMode={toggleDarkMode} advancedMode={advancedMode} toggleAdvancedMode={toggleAdvancedMode}/>}
      <div className='code-area'>
        <Chat onSubmit={handleResult} onHistory={handleHistory} darkMode={darkMode} advancedMode={advancedMode}/>
        <CodeTab result1={result} darkMode={darkMode}/>
      </div>
    </div>
  );
}

export default ChatBot;

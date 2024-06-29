import React, { useState } from 'react';
import SideBar from './SideBar';
import Chat from './chat';
import CodeTab from './tabs';
import { IconButton, Drawer } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function ChatBot() {
  const [result, setResult] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [history, setHistory] = useState([]);
  const [open, setOpen] = useState(window.innerWidth < 960);
  const [darkMode, setDarkMode] = useState(false);
  const [advancedMode, setAdvancedMode] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  React.useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth < 960);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    fetchChatHistory();
  }, []);

  const saveChatHistory = async (result, imagePreview) => {
    const authTokens = localStorage.getItem('authTokens'); 
    const tokens = JSON.parse(authTokens);
    const token = tokens.access;

    const formData = new FormData();
    formData.append('result', result);
    if (imagePreview) {
      const response = await fetch(imagePreview);
      const blob = await response.blob();
      formData.append('image', blob, 'image.png');
    }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await fetch('http://localhost:8000/api/chathistory/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Chat history saved:', data);
      } else {
        const errorData = await response.json();
        console.error('Failed to save chat history:', errorData);
      }
    } catch (error) {
      console.error('Error during saveChatHistory:', error);
    }
  };

  const fetchChatHistory = async () => {
    const authTokens = localStorage.getItem('authTokens'); 
    const tokens = JSON.parse(authTokens);
    const token = tokens.access;

    const response = await fetch('http://localhost:8000/api/chathistory/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      // console.log('Fetched chat history:', data);
      setHistory(data);
    } else {
      console.error('Failed to fetch chat history');
    }
  };

  const toggleAdvancedMode = () => {
    setAdvancedMode(!advancedMode);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleResult = (data) => {
    setResult(data);

  };

  const handleHistory = async (data) => {
    setHistory((prevHistory) => [...prevHistory, data]);
    try {
      await saveChatHistory(data.result, data.image);
      console.log("saved history with data ", data);
      fetchChatHistory(); // Fetch history after successfully saving
    } catch (error) {
      console.error("Failed to save history:", error);
    }
  };
  

  const handleHistoryClick = (index) => {
    console.log(`Clicked history item at index: ${index}`);
    console.log('History item:', history[index]);
    setResult(history[index].result);
    setImagePreview(history[index].image.image);
  };

  const handleDeleteHistory = (id) => {
    console.log(`Deleted history item at index: ${id}`);
    const newHistory = history.filter((item) => item.id !== id);
    setHistory(newHistory);
    deleteChatHistory(id);
  };

  const deleteChatHistory = async (index) => {
    const authTokens = localStorage.getItem('authTokens'); 
    const tokens = JSON.parse(authTokens);
    const token = tokens.access;

    const response = await fetch(`http://localhost:8000/api/chathistory/${index}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      console.log('Chat history deleted : ', index);
      setHistory((prevHistory) => prevHistory.filter(item => item.index !== index));
    } else {
      console.error('Failed to delete chat history');
    }
  };

  return (
    <div className="chatbot">
      {open ? 
      <div>
        <IconButton variant="text" size="lg" onClick={openDrawer}>
          {isDrawerOpen ? (
            <XMarkIcon className="h-8 w-8 stroke-2" />
          ) : (
            <Bars3Icon className="h-8 w-8 stroke-2" />
          )}
        </IconButton>
        <Drawer open={isDrawerOpen} onClose={closeDrawer}>
          <SideBar fetchChatHistory = {fetchChatHistory} history_store={history} darkMode={darkMode} toggleDarkMode={toggleDarkMode} advancedMode={advancedMode} toggleAdvancedMode={toggleAdvancedMode} handleHistoryClick={handleHistoryClick} handleDeleteHistory={handleDeleteHistory}/>
        </Drawer>
      </div>
      : <SideBar history_store={history} darkMode={darkMode} toggleDarkMode={toggleDarkMode} advancedMode={advancedMode} toggleAdvancedMode={toggleAdvancedMode} handleHistoryClick={handleHistoryClick} handleDeleteHistory={handleDeleteHistory}/>}
      <div className='code-area'>
        <Chat onSubmit={handleResult} onHistory={handleHistory} darkMode={darkMode} advancedMode={advancedMode} historyImagePreview={imagePreview}/>
        <CodeTab result1={result} darkMode={darkMode}/>
      </div>
    </div>
  );
}

export default ChatBot;

import { BrowserRouter, Routes, Route, useLocation  } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './HomePage/Home';
import ChatBot from './chatbot/ChatBot';
import LoginPage from './Login/login';
import SignUp from './Login/Signup';
import CheckoutForm from './chatbot/upgrade';
import PrivateRoute from './PrivateRoute';
import AuthService from './authService';

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatbot/*" element={<PrivateRoute />}>
          <Route path="*" element={<ChatBot />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/upgrade" element={<CheckoutForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

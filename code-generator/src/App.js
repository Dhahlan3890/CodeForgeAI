import { BrowserRouter, Routes, Route, useLocation  } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './HomePage/Home';
import ChatBot from './chatbot/ChatBot';
import LoginPage from './Login/login';
import SignUp from './Login/Signup';
import CheckoutForm from './chatbot/upgrade';
import PrivateRoute from './PrivateRoute';
import AuthService from './authService';
import ProfileList from './chatbot/profilepages/ProfileList';
import ProfileDetail from './chatbot/profilepages/ProfileDetail';
import ProfileForm from './chatbot/profilepages/ProfileForm';
import { AuthProvider } from './context/AuthContext'
function App() {
  

  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatbot/*" element={<PrivateRoute />}>
          <Route path="*" element={<ChatBot />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/upgrade" element={<CheckoutForm />} />
        <Route path="/" element={<ProfileList />} />
        <Route path="/profile/:id" element={<ProfileDetail />} />
        <Route path="/create-profile" element={<ProfileForm />} />
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

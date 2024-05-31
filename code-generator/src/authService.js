// src/authService.js
const AuthService = {
    login: async (email, password) => {
      try {
        const response = await fetch('http://localhost:8000/api/login/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
  
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('token', data.token);
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error('Error:', error);
        return false;
      }
    },
  
    logout: () => {
      localStorage.removeItem('token');
    },
  
    isAuthenticated: () => {
      const token = localStorage.getItem('token');
      if (!token) return false;
      try {
        const { exp } = JSON.parse(atob(token.split('.')[1]));
        if (Date.now() >= exp * 1000) {
          localStorage.removeItem('token');
          return false;
        }
        return true;
      } catch (error) {
        return false;
      }
    }
  };
  
  export default AuthService;
  
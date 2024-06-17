import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import Message from './Message';
import AuthService from '../authService';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import './login-signup.css';

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Registration successful!');
        navigate('/login');
      } else {
        setMessage(data.msg);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Something went wrong!');
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const { credential } = credentialResponse;
    try {
      const response = await fetch('http://localhost:8000/api/google-login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credential }),
      });

      const data = await response.json();
      if (response.ok) {
        AuthService.saveToken(data.token); // Save token in AuthService
        navigate('/chatbot');
      } else {
        setMessage(data.msg);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Something went wrong!');
    }
  };

  const handleGoogleLoginFailure = (response) => {
    console.log('Google login failure:', response);
    setMessage('Google login failed. Please try again.');
  };

  return (
    <GoogleOAuthProvider clientId="762258283337-qg5rlsln6kjmmj0r74nt10qbro8kj0rg.apps.googleusercontent.com">
      <form action="#" className="mx-auto max-w-[24rem] text-left" onSubmit={handleSubmit} id="card">
        <Card className="w-96">
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              CodeForgeAI
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="Name" size="lg" value={name} onChange={(e) => setName(e.target.value)} />
            <Input label="Email" size="lg" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="Password" size="lg" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0 flex flex-col gap-4">
            {message && <Message message={message} />}
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onFailure={handleGoogleLoginFailure}
              render={(renderProps) => (
                <Button
                  variant="outlined"
                  size="lg"
                  className="mt-6 flex h-12 items-center justify-center gap-2"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <img
                    src={`https://www.material-tailwind.com/logos/logo-google.png`}
                    alt="google"
                    className="h-6 w-6"
                  />{" "}
                  Sign up with Google
                </Button>
              )}
            />
            <Button variant="gradient" fullWidth type="submit">
              Sign Up
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
                onClick={() => navigate('/login')}
              >
                Sign in
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </form>
    </GoogleOAuthProvider>
  );
}

export default Signup;

import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
  Spinner,
} from "@material-tailwind/react";
import './login-signup.css';
import AuthContext from '../context/AuthContext'

function Login() {
  const navigate = useNavigate();
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [rememberMe, setRememberMe] = useState(false);
  // const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const {loginUser} = useContext(AuthContext)

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault()
    // console.log(e.target)
    

    const email = e.target.email.value
    const password = e.target.password.value

    loginUser(email, password)
    setLoading(false);
  }


  // const handleGoogleLoginSuccess = async (credentialResponse) => {
  //   const { credential } = credentialResponse;
  //   try {
  //     const response = await fetch('http://localhost:8000/api/google-login/', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ token: credential }),
  //     });

  //     const data = await response.json();
  //     if (response.ok) {
  //       console.log("Google Token : ", data.token)
  //       AuthService.saveToken(data.token); // save token in AuthService
  //       navigate('/chatbot');
  //     } else {
  //       setMessage(data.msg || 'Google login failed');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     setMessage('Something went wrong!');
  //   }
  // };

  // const handleGoogleLoginFailure = (error) => {
  //   console.log('Google login failure:', error);
  //   setMessage('Google login failed. Please try again.');
  // };

  return (
    // <GoogleOAuthProvider clientId="762258283337-qg5rlsln6kjmmj0r74nt10qbro8kj0rg.apps.googleusercontent.com">
      <form action="#" className="mx-auto max-w-[24rem] text-left" onSubmit={handleSubmit} id="card">
        <Card className="w-96">
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="Email" size="lg" type="email" name="email"/>
            <Input label="Password" size="lg" type="password" name="password" />
            {/* <div className="-ml-2.5">
              <Checkbox label="Remember Me" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
            </div> */}
          </CardBody>
          <CardFooter className="pt-0 flex flex-col gap-4">
            {/* {message && <Message message={message} />} */}
            {/* <GoogleLogin
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
                  Sign in with Google
                </Button>
              )}
            /> */}
            <Button variant="gradient" fullWidth type="submit">
              {loading ? <Spinner /> : 'Sign In'}
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don&apos;t have an account?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
                onClick={() => navigate('/signup')}
              >
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </form>
    // </GoogleOAuthProvider>
  );
}

export default Login;

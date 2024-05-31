import React from 'react';
import CodingAi from './assets/robot.png';
import { Button } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

function Intro() {
    const navigate = useNavigate();

  const SignUpClick = () => {
    navigate('/signup'); // Navigate to the About page
  };
    return (
        <div className='Intro'>
            <img src={CodingAi} alt="nature" />
            <div>
                <div >
                    <h1>Welcome to CodeForgeAI</h1>
                    <p>code with our AI powered platform</p>
                </div>
                
                <Button variant="gradient" color='blue-gray' onClick={SignUpClick}>Join Now</Button>
                
            </div>
            
        </div>
    );
}

export default Intro;
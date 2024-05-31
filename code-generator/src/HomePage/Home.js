import React from 'react';
import Header from './Header';
import Intro from './Intro';
import './Home.css';

function Home() {
  return (
    <div className='home'>
      <Header />
      <Intro />
    </div>
  );
}

export default Home;

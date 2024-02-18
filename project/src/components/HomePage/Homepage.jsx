import React from 'react';
import './Homepage.scss';

import {useNavigate} from 'react-router-dom';


const Homepage = () => {
  const navigagte = useNavigate();
  const handleNavigate =()=>{
    navigagte('/signup')
  }

  return (
    <>
        <div className="home_mainContainer">
        <div className="heading">
            <h1 className='text-center'>Welcome To Library Managment</h1>
            <button className='btn' onClick={handleNavigate}>Visti Website </button> 
        </div>
        </div>
    </>
  )
}

export default Homepage;

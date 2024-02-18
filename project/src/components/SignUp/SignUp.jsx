import React, { useState,useEffect } from "react";
import "./SignUp.scss";
import imgs from '../../images/dsk.jpeg';
// import axios from 'axios';
import {useNavigate} from 'react-router-dom';



const SignUp = () => {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigagte = useNavigate();

  // const handSubmit =()=>{
  //   console.log(name,email,password);
  //   const config ={
  //     method:'POST',
  //     url:'http://localhost:5000/signup',
  //     headers:{
  //       'Content-Type':'application/json'
  //     },
  //     data:JSON.stringify({name:name,email:email,password:password}),
  //   }
  //     axios(config).then((resp)=>{console.log(resp.data)}).catch((err)=>{
  //       console.log(err)
  //     })
  //     localStorage.setItem('user',(config.data))
  //     navigagte('/collection');
  // }

  const handSubmit =async()=>{
    console.log(email,name,password);
    let result = await fetch('http://localhost:5000/signup',{
      method:'post',
      body:JSON.stringify({name,email,password}),
      headers:{
        'content-type':'application/json'
      }
    });
    result= await result.json();
    console.log(result)
    localStorage.setItem("user",JSON.stringify(result.result))
    localStorage.setItem("token",JSON.stringify(result.auth))
    navigagte('/collection');
  }

  useEffect(()=>{
    const auth = localStorage.getItem('user');
    if(auth){
      navigagte('/')
    }
  })

  return (
    <>
      <div className="main_container">
        <div className="main_box">

          <div className="row ">

            <div className="col-sm-12 ">

              <div className="row ">
                <div className="col-sm-6 left_box"> 
                    <img src={imgs} alt="books releated" />
                    
                </div>

                <div className="col-sm-6 right_box">
                    <div className="inputFilds">
                    <h1 className="text-center">SignUp</h1>
                        <input type="text" placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                        <input type="email" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        <input type="pass" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        <button onClick={handSubmit}>SignUp</button>

                    </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;

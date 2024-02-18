import React,{useEffect, useState} from 'react';
import './Login.scss';
import {useNavigate} from 'react-router-dom';
import imgs from '../../images/dsk.jpeg';


const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const Navigate = useNavigate();
    useEffect(()=>{
      const auth = localStorage.getItem('user');
      if(auth){
        Navigate("/");
      }
    })

    const handSubmit = async()=>{
      console.log(email,password);
      let result = await fetch("http://localhost:5000/login", {
        method: "post",
        body: JSON.stringify({ email: email, password: password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.warn(result);
      if (result.auth) {
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", JSON.stringify(result.auth));

        Navigate("/");
      } else{
        alert("invalid user found");
      }
    }
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
                    <h1 className="text-center">LogIn</h1>
                        <input type="email" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        <input type="pass" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        <button onClick={handSubmit}>LogIn</button>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;

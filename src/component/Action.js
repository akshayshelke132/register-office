import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

let password=localStorage.getItem('password');
let urname=localStorage.getItem('urname')


const Action=()=>{
    const [usern,setUsern]=useState(urname);
    const [passd,setPassd]=useState(password);
    const [userstate,setUserState]=useState("");
    const email=localStorage.getItem('email');
    
    function Update(){
        axios.put('http://localhost:4006/user_update',{
            headers:{'auth':localStorage.getItem('token')},
            username:usern,
            password:passd,
            uid:localStorage.getItem('uid'),
        }).then((respon)=>{
            if(respon.data.sms){
                setUserState(respon.data.sms)
            }
            else{
                localStorage.setItem('urname',usern)
                localStorage.setItem('password',passd)
                window.location='http://localhost:3000/user_profile'
            }
        })
    }
    const Logout=()=>{
        window.location='http://localhost:3000/'
        localStorage.clear();
    }

    return(   
        <>
        <nav className='mynav'>
        <h2 className="myh2">REGISTRATION OFFICE</h2>
        <div>
          <ul className="myul2">
            <li><Link to={'/user_profile'}>Profile</Link></li><br></br>
            <li onClick={Logout} className="logout">Logout({urname})</li>
          </ul>
        </div>
        </nav>
            <div className="login-block">
            <form>
                <fieldset>
                    <legend className="form-title">EDIT</legend>
                    <div className="user"><i class="fa-solid fa-circle-user fa-5x" ></i></div><br></br>
                    <label><i class="fa-solid fa-user fa-lg"></i></label>
                    <input type={"text"} value={email} className="logo-place" disabled required></input><br></br>
                    <label><i class="fa-solid fa-envelope fa-la"></i></label>
                    <input type={"text"} value={usern} className="logo-place" onChange={(e)=>{setUsern(e.target.value)}}  minLength="4" maxLength="30" required></input><br></br>
                    <label><i class="fa-solid fa-lock fa-lg"></i></label>
                    <input type={"password"} value={passd} className="logo-place" onChange={(e)=>{setPassd(e.target.value)}}  minLength="4" maxLength="15" required></input><br></br>
                    <br></br>
                    <button type="submit" className="log-bt" onClick={Update}>UPDATE</button><br></br>
                    <h4>{userstate}</h4>
                </fieldset>
            </form>
        </div>
        </>
    )
};
export default Action;
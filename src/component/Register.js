import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const Register=()=>{
    const [email,setEmail]=useState("");
    const [usern,setUsern]=useState("");
    const [passd,setPassd]=useState("");
    const [userstate,setUserState]=useState("");
   

    function Regin(e){
        e.preventDefault();
        axios.post('http://localhost:4006/regin',
        {
            email:email,
            username:usern,
            password:passd
        }
        ).then((respon)=>{
            if(respon.data.sms){
                setUserState(respon.data.sms)
            }
            else{
                axios.post('http://localhost:4006/login',
            {
                email:email,
                password:passd
            }
            ).then((respon)=>{
            if(respon.data.sms){
                setUserState(respon.data.sms)
            }
            else{
                localStorage.setItem('email',respon.data.into[0].email)
                localStorage.setItem('urname',respon.data.into[0].username)
                localStorage.setItem('password',respon.data.into[0].passd)
                localStorage.setItem('uid',respon.data.into[0].uid)
                localStorage.setItem('token',respon.data.token)
                window.location='http://localhost:3000/user_profile'
            }
        })
            }
        })
    };

    return(
        <>
        <nav className='mynav'>
        <h2 className="myh2">REGISTRATION OFFICE</h2>
        <div>
          <ul className="myul">
            <li><Link to={'/'}>LOGIN</Link></li><br></br>
            <li><Link to={'/register'}>REGISTER</Link></li>
          </ul>
        </div>
        </nav>
        <div className="login-block">
        <form>
                <fieldset>
                    <legend className="form-title">REGISTRATION</legend>
                    <div className="user"><i class="fa-solid fa-circle-user fa-5x" ></i></div><br></br>
                    <label><i class="fa-solid fa-envelope fa-la"></i></label>
                    <input type={"text"} placeholder="email" className="logo-place" onChange={(e)=>{setEmail(e.target.value)}}  minLength="8" maxLength="30" required></input><br></br>
                    <label><i class="fa-solid fa-user fa-lg"></i></label>
                    <input type={"text"} placeholder="username" className="logo-place" onChange={(e)=>{setUsern(e.target.value)}}  minLength="4" maxLength="15" required></input><br></br>
                    <label><i class="fa-solid fa-lock fa-lg"></i></label>
                    <input type={"password"} placeholder=" password" className="logo-place" onChange={(e)=>{setPassd(e.target.value)}}  minLength="4" maxLength="10" required></input><br></br>
                    <br></br>
                    <button type="submit" className="log-bt" onClick={Regin}>REGISTER</button><br></br>
                    <Link to='/' className="link-col">Already Register</Link><br></br>
                    <h4>{userstate}</h4>
                </fieldset>
            </form>

        </div>
        </>
    )
}
export default Register
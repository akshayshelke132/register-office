
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const tablehead=['Email','Name','Password','Action'];

const UserTable=()=>{
    const [userstate,setUserState]=useState("");
    const [userdata,setUserdata]=useState([]);
    const uname=localStorage.getItem('urname')

    function GetDetails(){
        axios.post('http://localhost:4006/get_user_detail',
        {
            headers:{'auth':localStorage.getItem('token')},
            uid:localStorage.getItem('uid'),
            username:localStorage.getItem('urname'),
            password:localStorage.getItem('password'),
        }
        ).then((respon)=>{
            if(respon.data.sms){
                setUserState(respon.data.sms)
            }else if(respon.data) {
                setUserdata(respon.data)
            }else{
                setUserState("loading...")
            }
        })
    };
    GetDetails()

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
            <li onClick={Logout} className="logout">Logout({uname})</li>
          </ul>
        </div>
        </nav>
        {(userstate.length!=0)?<h3>{userstate}</h3>:
        <div className="tablecover">
            <table className="mytable">
                <thead>
                        <tr>
                        <th>#</th>
                            {
                                tablehead.map(head=>{
                                    return(
                                        <>
                                        <th>{head}</th>
                                        </>
                                    )
                                })
                            }
                        </tr>
                </thead>
                <tbody>
                    {userdata.map((col,index)=>{
                        return(
                            <>
                            <tr>
                            <td>{index+1}</td>
                            <td>{col.email}</td>
                            <td>{col.username}</td>
                            <td>{col.passd}</td>
                            <td><Link to={'/action'}>Edit</Link></td>
                            </tr>
                            </>
                        )
                    })}
            </tbody>
            </table>
        </div>
        }
        </>
    )
}

export default UserTable;
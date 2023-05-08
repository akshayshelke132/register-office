import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import './design/user.css';
import './design/usertable.css'
import Login from './component/Login';
import Register from './component/Register';
import UserTable from './component/Profile';
import Action from './component/Action';

function App() {
  return (
    <>
    <div>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/user_profile' element={<UserTable></UserTable>}></Route>
        <Route path='/action' element={<Action></Action>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;

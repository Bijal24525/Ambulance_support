import React, { useContext, useEffect, useRef, useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home/Home'
import Map from './Components/Map/Map'
import MyDetail from './Components/MyDetail/MyDetail'
import { LoginContext } from './Components/Context/Context';
import TrafficList from './Components/Traffic Detail/TrafficList';


const AppRouter = () => {
    const {user, setUser} = useContext(LoginContext)
        const handleLogout=()=>{
            setUser(null)
            // Removing data from local storage
            localStorage.removeItem('userName');

            console.log("logout")
        }

    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/map" element={<Map/>}/>
            <Route path="/traffic" element={<TrafficList/>}/>
            <Route path="/mydetail" element={<MyDetail/>}/>
        </Routes>
    )
}

export default AppRouter;
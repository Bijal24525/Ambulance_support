import React, { useContext, useState, useEffect } from 'react';

import { Button, Card } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { LoginContext } from '../Context/Context';
// import Footer from '../footer';
import './home.css';


const Home = () => {
    const {user, setUser} = useContext(LoginContext)
        const handleLogout=()=>{
            setUser(null)
            // Removing data from local storage
            localStorage.removeItem('userName');

            console.log("logout")
        }

    return (
        <div>
            <div className="flex justify-center content-center form-block">
                <Card className="w-48 p-6 flex flex-col gap-4 form-card">
                {/* <div className=""> */}
                <h1><b>Welcome to <br></br><span className='title'>Driver App</span></b></h1><br/>
                    <Link to='/'><Button className="w-full">Home</Button></Link>
                    <Link to='/map'><Button className="w-full">Map</Button></Link>
                    <Link to='/mydetail'><Button className="w-full">My Detail</Button></Link>
                    <Link to='/traffic'><Button className="w-full">Contact Traffic</Button></Link>
                    <Link to='/'><Button className="w-full logout" color="red" onClick={handleLogout}>Logout</Button></Link>
                {/* </div> */}
                </Card>
                
            </div>
            {/* <Footer/> */}
        </div>
    )
}

export default Home;
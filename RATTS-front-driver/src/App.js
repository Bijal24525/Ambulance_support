import React, { useState, useEffect } from 'react';
import './App.css';
import AppRouter from './AppRouter'
import Login from './Components/Login/Login';

import { LoginContext } from './Components/Context/Context';


function App() {
  const [user, setUser] = useState(null)
  // console.log("User is",user)

  useEffect( () => {
    // Retrieving data from local storage
    const storedValue = localStorage.getItem('userName');
    console.log(storedValue)
    if(storedValue)
    {
    setUser(storedValue)
    }
    return () => {
    }
  }, [user])

  return (
    <LoginContext.Provider value={{user, setUser}} >
    { !user ?
      <Login/>
      :
      <div className="App">
        <AppRouter />
      </div>
    }
    </LoginContext.Provider>
  );
}

export default App;

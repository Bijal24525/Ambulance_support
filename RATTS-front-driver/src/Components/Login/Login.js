import React, { useContext, useState } from 'react';
import { LoginContext } from '../Context/Context';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useContext(LoginContext)

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("No credentials")
    }
    else {
      try {
        const resB = await fetch('http://localhost:5000/driver', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        })
        const res = await resB.json();
        // console.log(res);
        console.log(JSON.stringify(res))
        const response = JSON.stringify(res)
        const dataArray = JSON.parse(response);
        const hasDriver = dataArray.some(driver => driver.driver_id === username && driver.contact === password);
        if (hasDriver) {
          const matchedArray = dataArray.filter(driver => driver.driver_id === username && driver.contact === password);
          setUser(matchedArray[0].name)
          // Storing data in local storage
          localStorage.setItem('userName',matchedArray[0].name);
        }
        else {
          alert('Invalid Not found')
        }

      } catch (error) {
        console.log(error)
        alert("Error")
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block font-semibold mb-2">
              Username:
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-semibold mb-2">
              Password:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

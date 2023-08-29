import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import RecordingComponent from './RecordingComponent';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('/register', { email, password });
      console.log(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('/login', { email, password });
      setToken(response.data.token);
      console.log('Logged in with token:', response.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Authentication Example</h1>
      <div>
        <h2>Register</h2>
        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button onClick={handleRegister}>Register</button>
      </div>
      <div>
        <h2>Login</h2>
        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default App;

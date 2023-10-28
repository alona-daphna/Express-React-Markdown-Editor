import React, { useRef, useState } from 'react';
import { ModeToggle } from '../components/ModeToggle';
import { generateAccessToken } from '../api';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const password = useRef(null);
  const [unauthorized, setUnauthorized] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    const response = await generateAccessToken({
      password: password.current.value,
    });

    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem('token', token);
      navigate('/');
    } else {
      setUnauthorized(true);
    }
  };

  return (
    <>
      <div className="login-mode-toggle">
        <ModeToggle />
      </div>
      <div className="login">
        <h3>Login 🍷</h3>
        <input ref={password} type="password" placeholder="password" />
        <button onClick={handleLogin}>login</button>
        {unauthorized && <div className="unauthorized">Unauthorized</div>}
      </div>
    </>
  );
};

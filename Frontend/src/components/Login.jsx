import React, { useContext, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import { Context } from '../main';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/user/login',
        { email, password },
        { withCredentials: true }
      );
      setIsAuthenticated(true); // Set authentication state to true
      localStorage.setItem('token', 'true'); // Store the token in local storage
      toast.success('Login successful');
      console.log('Login response:', response.data);
    } catch (error) {
      toast.error('Login failed');
      console.error('Login error:', error);
    }
  };

  // Redirect to Home page if authenticated
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-[94vh] w-full bg-gray-400 flex flex-col items-center justify-center p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl text-black mb-6 sm:mb-8">LOGIN</h2>
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md flex flex-col gap-4 sm:gap-6"
      >
        <input
          className="w-full border-2 text-lg sm:text-xl outline-none border-gray-300 rounded-lg p-2"
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border-2 text-lg sm:text-xl outline-none border-gray-300 rounded-lg p-2"
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-lg sm:text-xl"
        >
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
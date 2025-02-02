import axios from 'axios';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, Navigate } from 'react-router-dom';
import { Context } from '../main';

const SingUp = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleForm = async (e) => {
    e.preventDefault(); // Prevent page refresh
    try {
      const response = await axios.post('http://localhost:3000/user/singup', {
        name,
        email,
        password,
      });

      if (response.status === 201 || response.status === 200) {
        setIsAuthenticated(true); // Fix this line
        toast.success('Sign up successful');
      } else {
        toast.error(`Sign up failed: ${response.data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Sign up failed');
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-[94vh] w-full bg-gray-400 flex flex-col items-center justify-center p-4 sm:p-6">
      <form className="w-full max-w-md flex flex-col gap-4 sm:gap-6">
        <input
          className="w-full border-2 text-lg sm:text-xl outline-none border-gray-300 rounded-lg p-2"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full border-2 text-lg sm:text-xl outline-none border-gray-300 rounded-lg p-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border-2 text-lg sm:text-xl outline-none border-gray-300 rounded-lg p-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      <div className="w-full max-w-md flex flex-col items-center gap-2 sm:gap-4 mt-4 sm:mt-6">
        <button
          type="submit"
          onClick={handleForm}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-lg sm:text-xl"
        >
          Sign Up
        </button>
        <p className="text-lg sm:text-xl">or</p>
        <Link
          to="/login"
          className="text-lg sm:text-xl text-blue-500 hover:text-blue-700"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default SingUp;
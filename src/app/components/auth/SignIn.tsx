import React, { useState } from 'react';
import { motion } from 'framer-motion';
import apiService from '../../services/apiService';
import axios from 'axios';

interface SignInProps {
  onSignIn: (token: string) => void;
  onSwitchToSignUp: () => void;
  onError: (message: string, statusCode?: number) => void;
}

const SignIn: React.FC<SignInProps> = ({ onSignIn, onSwitchToSignUp, onError }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await apiService.post('/auth/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      onSignIn(token);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        onError(err.response?.data?.error || 'Sign in failed. Please try again.', err.response?.status);
      } else {
        onError('Sign in failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full mx-auto p-8 bg-white bg-opacity-20 backdrop-blur-xl rounded-2xl shadow-lg"
    >
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Welcome Back</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white bg-opacity-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white bg-opacity-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </motion.button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={onSwitchToSignUp}
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Sign Up
        </motion.button>
      </p>
    </motion.div>
  );
};

export default SignIn;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import apiService from '../../services/apiService';
import axios from 'axios';

interface SignUpProps {
  onSignUp: (token: string) => void;
  onSwitchToSignIn: () => void;
  onError: (message: string, statusCode?: number) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignUp, onSwitchToSignIn, onError }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!showOtpField) {
        const response = await apiService.post('/auth/signup', { name, email, password, phoneNumber });
        if (response.data.otpSent) {
          setShowOtpField(true);
        } else {
          onError(response.data.message || 'Registration successful, but there was an issue sending the OTP. Please contact support.');
        }
      } else {
        const response = await apiService.post('/auth/verify-email', { email, otp });
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        onSignUp(token);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        onError(err.response?.data?.error || 'An unexpected error occurred', err.response?.status);
      } else {
        onError('An unexpected error occurred');
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
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Create Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!showOtpField ? (
          <>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white bg-opacity-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
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
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white bg-opacity-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </>
        ) : (
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">Enter OTP</label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white bg-opacity-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        )}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? 'Processing...' : (showOtpField ? 'Verify OTP' : 'Sign Up')}
        </motion.button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={onSwitchToSignIn}
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Sign In
        </motion.button>
      </p>
    </motion.div>
  );
};

export default SignUp;
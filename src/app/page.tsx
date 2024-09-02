"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import DeveloperSearch from './developer_search_screen/page';
import ErrorDisplay from './components/common/ErrorDisplay';

type AuthStatus = 'signIn' | 'signUp' | 'authenticated';

export default function Home() {
  const [authStatus, setAuthStatus] = useState<AuthStatus>('signIn');
  const [token, setToken] = useState<string | null>(null);
  const [globalError, setGlobalError] = useState<{ message: string; statusCode?: number } | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setAuthStatus('authenticated');
    }
  }, []);

  const handleSignIn = (newToken: string) => {
    setToken(newToken);
    setAuthStatus('authenticated');
  };

  const handleSignUp = (newToken: string) => {
    setToken(newToken);
    setAuthStatus('authenticated');
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setToken(null);
    setAuthStatus('signIn');
  };

  const handleError = (message: string, statusCode?: number) => {
    setGlobalError({ message, statusCode });
  };

  return (
    <main className="min-h-screen p-4 bg-gradient-to-br from-blue-100 via-white to-purple-100 flex flex-col items-center justify-center">
      <ErrorDisplay error={globalError} onClose={() => setGlobalError(null)} />
      
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold mb-2 text-gray-800">Developer Hub</h1>
        <p className="text-xl text-gray-600">Connect, Collaborate, Create</p>
      </motion.div>
      
      <AnimatePresence mode="wait">
        {authStatus === 'signIn' && (
          <motion.div
            key="signIn"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <SignIn onSignIn={handleSignIn} onSwitchToSignUp={() => setAuthStatus('signUp')} onError={handleError} />
          </motion.div>
        )}

        {authStatus === 'signUp' && (
          <motion.div
            key="signUp"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <SignUp onSignUp={handleSignUp} onSwitchToSignIn={() => setAuthStatus('signIn')} onError={handleError} />
          </motion.div>
        )}

        {authStatus === 'authenticated' && token && (
          <motion.div
            key="developerSearch"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl"
          >
            <DeveloperSearch onSignOut={handleSignOut} token={token} onError={handleError} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
import React, { useState } from 'react';
import axios from 'axios';

const VerifyEmail: React.FC<{ email: string; onVerified: () => void }> = ({ email, onVerified }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/auth/verify-email', { email, otp });
      onVerified();
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
        required
      />
      {error && <div>{error}</div>}
      <button type="submit">Verify</button>
    </form>
  );
};

export default VerifyEmail;

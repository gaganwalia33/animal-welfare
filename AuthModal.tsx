import React, { useState } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';
import { useAuth } from './AuthContext';

type AuthMode = 'login' | 'signup' | 'verify-email';

const AuthModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const { login, signup } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(email, password, name);
      setMode('verify-email');
    } catch (err: any) {
      setError(err.message || 'Signup failed. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{mode === 'login' ? 'Login' : mode === 'signup' ? 'Sign Up' : 'Verify Email'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{error}</div>}

        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 pl-10 border rounded-lg" />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 pl-10 border rounded-lg" />
            </div>
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg">Login</button>
            <p className="text-center">
              Don't have an account?
              <button type="button" onClick={() => setMode('signup')} className="text-green-600 ml-2 hover:underline">Sign Up</button>
            </p>
          </form>
        )}

        {mode === 'signup' && (
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Full Name" required value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 pl-10 border rounded-lg" />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 pl-10 border rounded-lg" />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 pl-10 border rounded-lg" />
            </div>
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg">Create Account</button>
            <p className="text-center">
              Already have an account?
              <button type="button" onClick={() => setMode('login')} className="text-green-600 ml-2 hover:underline">Login</button>
            </p>
          </form>
        )}

        {mode === 'verify-email' && (
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold">Verify Your Email</h3>
            <p className="text-gray-600">We've sent a verification email to {email}. Please check your inbox and click the verification link.</p>
            <button onClick={onClose} className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg">Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;

import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { LoaderIcon } from './Icons';

interface AuthFormProps {
  onLogin: (user: User) => void;
  onSuccess?: () => void;
  className?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ onLogin, onSuccess, className = "" }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState<UserRole>('student');
  const [loading, setLoading] = useState(false);
  
  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [institution, setInstitution] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: isRegister ? name : "Demo User",
        email,
        role: isRegister ? role : 'student',
        institution: isRegister ? institution : 'Demo University'
      };
      
      onLogin(newUser);
      setLoading(false);
      if (onSuccess) onSuccess();
    }, 1000);
  };

  return (
    <div className={`w-full max-w-sm mx-auto ${className}`}>
      
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 p-8 overflow-hidden relative">
        {/* Decorative top highlight */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-blue-600"></div>
        
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {isRegister ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-1">
            Join CompeteConnect and track competition instantly.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {isRegister 
              ? 'Sign up to manage or discover events.' 
              : 'Enter your details to access your dashboard.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegister && (
            <>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">Role</label>
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all dark:text-white appearance-none text-sm"
                >
                  <option value="student">Candidate / Student</option>
                  <option value="organizer">Organizer</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">Full Name</label>
                <input 
                  type="text" 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all dark:text-white text-sm placeholder-gray-400"
                  placeholder="John Doe"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">Email Address</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all dark:text-white text-sm placeholder-gray-400"
              placeholder="name@example.com"
            />
          </div>

          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">
                {role === 'student' ? 'School / Institution' : 'Organization Name'}
              </label>
              <input 
                type="text" 
                required 
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all dark:text-white text-sm placeholder-gray-400"
                placeholder={role === 'student' ? 'e.g. Stanford University' : 'e.g. Tech Corp'}
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all dark:text-white text-sm placeholder-gray-400"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg shadow-lg shadow-primary-500/30 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex justify-center items-center text-sm"
          >
            {loading ? <LoaderIcon className="animate-spin w-5 h-5" /> : (isRegister ? 'Create Account' : 'Sign In')}
          </button>
        </form>

        <div className="mt-6 text-center pt-4 border-t border-gray-100 dark:border-slate-700/50">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button 
              onClick={() => setIsRegister(!isRegister)}
              className="text-primary-600 dark:text-primary-400 font-bold hover:underline focus:outline-none"
            >
              {isRegister ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
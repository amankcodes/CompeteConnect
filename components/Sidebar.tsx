import React from 'react';
import { User } from '../types';
import { 
  LayoutDashboardIcon, 
  FileTextIcon, 
  BarChartIcon, 
  CompassIcon, 
  UserIcon, 
  SettingsIcon, 
  HelpCircleIcon, 
  LogOutIcon,
  XIcon,
  TrophyIcon
} from './Icons';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onLogout: () => void;
  onLogin: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, user, onLogout, onLogin }) => {
  
  const menuItems = [
    { label: 'Dashboard', icon: <LayoutDashboardIcon className="w-5 h-5" />, action: () => {} },
    { label: 'My Exams', icon: <FileTextIcon className="w-5 h-5" />, action: () => {} },
    { label: 'Competition Stats', icon: <BarChartIcon className="w-5 h-5" />, action: () => {} },
    { label: 'Explore Exams', icon: <CompassIcon className="w-5 h-5" />, action: () => {} },
    { label: 'Profile', icon: <UserIcon className="w-5 h-5" />, action: () => {} },
    { label: 'Settings', icon: <SettingsIcon className="w-5 h-5" />, action: () => {} },
    { label: 'Help & Support', icon: <HelpCircleIcon className="w-5 h-5" />, action: () => {} },
  ];

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div 
        className={`fixed top-0 left-0 h-full w-72 bg-white dark:bg-slate-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between">
           <div className="flex items-center space-x-2">
             <div className="bg-primary-600 text-white p-1.5 rounded-lg">
               <TrophyIcon className="w-5 h-5" />
             </div>
             <h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">CompeteConnect</h2>
           </div>
           <button 
             onClick={onClose}
             className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 dark:text-gray-400 transition-colors"
           >
             <XIcon className="w-5 h-5" />
           </button>
        </div>

        {/* User Section (Mobile style) */}
        {user && (
          <div className="p-5 border-b border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-800/50">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold shadow-md text-lg">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (!user && item.label !== 'Explore Exams' && item.label !== 'Help & Support') {
                   onClose();
                   onLogin();
                } else {
                   item.action();
                   onClose();
                }
              }}
              className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-primary-600 dark:hover:text-primary-400 transition-colors group text-left"
            >
              <span className="text-gray-400 dark:text-gray-500 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                {item.icon}
              </span>
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer / Logout */}
        <div className="p-4 border-t border-gray-200 dark:border-slate-800">
          {user ? (
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-slate-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-medium text-sm"
            >
              <LogOutIcon className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          ) : (
            <button
              onClick={() => {
                onLogin();
                onClose();
              }}
               className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors font-medium text-sm shadow-lg shadow-primary-500/20"
            >
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;

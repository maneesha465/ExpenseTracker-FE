import React from 'react';
import { LuTrendingUpDown } from 'react-icons/lu';
import loginImage from '../../assets/images/loginImage.png';

export const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left: Form area */}
      <div className="w-full md:w-[60vw] p-8 md:p-12 flex flex-col justify-between bg-white">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Expense Tracker</h2>
          {children}
        </div>
        <p className="text-sm text-gray-400 text-center mt-10">Secure & Simple Expense Management</p>
      </div>

      {/* Right: Image + stats area */}
      <div className="hidden md:flex w-[40vw] bg-violet-100 bg-auth-bg-img bg-cover bg-no-repeat bg-center relative items-center justify-center">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm z-0" />
        <div className="relative z-10 flex flex-col items-center justify-center p-6 space-y-6">
          {/* Circle Design */}
          <div className="w-56 h-56 bg-gradient-to-br from-fuchsia-500 to-violet-600 rounded-full flex items-center justify-center shadow-2xl">
            <div className="w-48 h-48 bg-white rounded-2xl p-4 flex flex-col justify-between items-center shadow-md">
              <StatsInfoCard
                icon={<LuTrendingUpDown size={22} />}
                label="Track your income & expenses"
                value="430,000"
                color="bg-purple-600"
              />
            </div>
          </div>

          {/* Image below card */}
          <img
            src={loginImage}
            alt="Login Visual"
            className="w-64 max-w-xs rounded-xl shadow-lg shadow-blue-400/20"
          />
        </div>
      </div>
    </div>
  );
};

// Enhanced StatsInfoCard
const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="text-center">
      <div className={`w-12 h-12 flex items-center justify-center ${color} text-white rounded-full shadow-md mb-3`}>
        {icon}
      </div>
      <h6 className="text-sm text-gray-600 font-medium">{label}</h6>
      <span className="text-xl font-bold text-gray-800">${value}</span>
    </div>
  );
};

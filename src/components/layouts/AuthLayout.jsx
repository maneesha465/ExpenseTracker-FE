import React from 'react';
import { LuTrendingUpDown } from 'react-icons/lu';
import loginImage from '../../assets/images/loginImage.png';

export const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Left: Form area */}
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black">Expense Tracker</h2>
        {children}
      </div>

      {/* Right: Image + stats area */}
      <div className="hidden md:flex w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative items-end">
        <div className="flex flex-col justify-between items-center w-full h-full">
          <div className="w-48 h-48 rounded-[40vw] bg-purple-600 relative">
            <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] right-[-2.5rem]">
              <div className="w-48 h-48 rounded-[40px] bg-violet-500 relative p-4 flex flex-col justify-between items-center">
                {/* Stats */}
                <StatsInfoCard
                  icon={<LuTrendingUpDown />}
                  label="Track your income and expenses"
                  value="430,000"
                  color="bg-primary"
                />

                {/* Image at bottom */}
                <img
                  src={loginImage}
                  alt="Login"
                  className="w-64 lg:w-[90%] shadow-lg shadow-blue-400/15 mt-4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Corrected StatsInfoCard
const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="text-white text-center">
      <div className={`w-12 h-12 flex items-center justify-center ${color} rounded-full drop-shadow-xl mb-2`}>
        {icon}
      </div>
      <h6 className="text-sm text-gray-200">{label}</h6>
      <span className="text-lg font-semibold">${value}</span>
    </div>
  );
};

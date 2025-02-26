import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-base-100 text-center p-4">
      <h1 className="text-6xl font-bold text-red-500 mb-4">401</h1>
      <h2 className="text-2xl font-semibold text-gray-100 mb-6">You are unauthorised..</h2>
      <p className="text-lg text-gray-400 mb-8">
        Please login to access the app...
      </p>
      <button
        onClick={handleBackToHome}
        className="px-6 py-3 bg-blue-600 cursor-pointer text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        Login Now
      </button>
    </div>
  );
};

export default ErrorPage;

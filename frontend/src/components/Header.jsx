import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div className="relative pb-5 h-30 bg-gray-200 p-4">
      {/* Top-right buttons */}
      <div className="absolute top-4 right-4 flex space-x-4">
        {token ? (
          <>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
                window.location.reload();
              }}
              className="w-20 h-9 border-1 border-black rounded-lg hover:border-gray-500 transition"
            >
              Logout
            </button>
            <button
              onClick={() => navigate("/user")}
              className="w-20 h-9 border-1 border-black rounded-lg hover:border-gray-500 transition"
            >
              User
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="w-20 h-9 border-1 border-black rounded-lg hover:border-gray-500 transition"
            >
              Login
            </button>
                        <button
              onClick={() => navigate("/register")}
              className="w-20 h-9 border-1 border-black rounded-lg hover:border-gray-500 transition"
            >
              Register
            </button>
            <button
              onClick={() => navigate("/user")}
              className="w-20 h-9 border-1 border-black rounded-lg hover:border-gray-500 transition"
            >
              User
            </button>
          </>
        )}
      </div>

      {/* Center Title */}
      <section className="flex justify-center items-center h-20">
        <button 
        className="text-2xl font-bold"
        onClick={() => navigate("/")}>
          JobTracker
          </button>
      </section>
    </div>
  );
};

export default Header;

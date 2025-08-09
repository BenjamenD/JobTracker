import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <header className="relative border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        <button 
          className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 hover:text-slate-700 transition"
          onClick={() => navigate("/")}
        >
          JobTracker
        </button>

        <div className="flex items-center gap-2">
        {token ? (
          <>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
                window.location.reload();
              }}
              className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
            >
              Logout
            </button>
            <button
              onClick={() => navigate("/user")}
              className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium border border-slate-300 text-slate-700 hover:bg-slate-900 hover:text-white transition"
            >
              User
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium border border-slate-300 text-slate-700 hover:bg-slate-900 hover:text-white transition"
            >
              Login
            </button>
              <button
              onClick={() => navigate("/register")}
              className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium border border-slate-300 text-slate-700 hover:bg-slate-900 hover:text-white transition"
            >
              Register
            </button>
            <button
              onClick={() => navigate("/user")}
              className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium border border-slate-300 text-slate-700 hover:bg-slate-900 hover:text-white transition"
            >
              User
            </button>
          </>
        )}
        </div>
      </div>
    </header>
  );
};

export default Header;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleLogin = () => {
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (email === "admin@gmail.com" && password === "admin@123") {
        setSuccess(true);
        setTimeout(() => navigate("/admin"), 1500);
      } else if (
        email === "cashier@gmail.com" &&
        password === "cashier@123"
      ) {
        setSuccess(true);
        setTimeout(() => navigate("/menu"), 1500);
      } else {
        setLoading(false);
        setError("Invalid email or password");
      }
    }, 1200);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#0f1220] to-[#05060f] text-white">

      {/* CARD */}
      <div
        className={`w-80 p-6 rounded-2xl backdrop-blur-xl
        bg-white/5 border border-white/10 shadow-xl
        transition-all duration-300
        ${error ? "animate-shake" : ""}`}
      >
        {!success ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-1">
              Welcome Back
            </h2>
            <p className="text-sm text-center text-gray-400 mb-6">
              Login to continue
            </p>

            {error && (
              <p className="text-red-500 text-sm text-center mb-3">
                {error}
              </p>
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-3 bg-[#1d2240] px-4 py-2 rounded-lg
                         outline-none focus:ring-2 focus:ring-amber-500"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-5 bg-[#1d2240] px-4 py-2 rounded-lg
                         outline-none focus:ring-2 focus:ring-amber-500"
            />

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-2 rounded-lg font-semibold
                         bg-gradient-to-r from-amber-500 to-orange-500
                         hover:opacity-90 transition
                         disabled:opacity-50"
            >
              {loading ? "Checking..." : "Login"}
            </button>
          </>
        ) : (
          /* SUCCESS ANIMATION */
          <div className="flex flex-col items-center gap-4 py-6">
            <div className="w-20 h-20 rounded-full bg-green-500
                            flex items-center justify-center
                            animate-scaleIn">
              <span className="text-4xl">✓</span>
            </div>
            <h3 className="text-lg font-semibold">
              Login Successful
            </h3>
            <p className="text-sm text-gray-400">
              Redirecting...
            </p>
          </div>
        )}
      </div>

      {/* ANIMATIONS */}
      <style>
        {`
          @keyframes shake {
            0%,100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
          }
          .animate-shake {
            animation: shake 0.3s;
          }

          @keyframes scaleIn {
            0% { transform: scale(0); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-scaleIn {
            animation: scaleIn 0.4s ease-out;
          }
        `}
      </style>
    </div>
  );
}

export default Login;

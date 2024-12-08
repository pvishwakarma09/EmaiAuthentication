import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const sendOtp = async () => {
    try {
      const response = await axios.post("http://localhost:5000/send-otp", { email });
      alert(response.data.message);
      setIsOtpSent(true);
    } catch (error) {
      alert(error.response?.data?.message || "Error sending OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post("http://localhost:5000/verify-otp", { email, otp });
      if (response.data.success) {
        alert("OTP Verified Successfully!");
        setIsVerified(true);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error verifying OTP");
    }
  };

  const handleSignup = async () => {
    if (!isVerified) {
      alert("Please verify your email first!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/signup", { email });
      alert(response.data.message);
      window.location.href = "/dashboard";
    } catch (error) {
      alert(error.response?.data?.message || "Error during signup");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500">
      <div className="p-8 bg-white shadow-2xl rounded-lg w-full max-w-md animate-fadeIn">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Welcome!</h2>

        {!isOtpSent ? (
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              required
            />
            <button
              onClick={sendOtp}
              className="w-full px-4 py-3 font-semibold text-white bg-indigo-500 rounded hover:bg-indigo-600 transition duration-300 ease-in-out"
            >
              Send OTP
            </button>
          </div>
        ) : !isVerified ? (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white"
              required
            />
            <button
              onClick={verifyOtp}
              className="w-full px-4 py-3 font-semibold text-white bg-green-500 rounded hover:bg-green-600 transition duration-300 ease-in-out"
            >
              Verify OTP
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={handleSignup}
              className="w-full px-4 py-3 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Complete Signup
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;

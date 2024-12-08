import { useNavigate } from "react-router-dom";  // Assuming you're using React Router

const Dashboard = () => {
  const navigate = useNavigate();  // Hook to navigate programmatically

  const handleLogout = () => {
    // Perform any cleanup if needed (like clearing user data, JWT tokens, etc.)
    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
      <div className="text-center text-white p-8 bg-opacity-70 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Dashboard!</h1>
        <p className="text-lg">Your email is successfully verified.</p>
        <button
          onClick={handleLogout}
          className="mt-6 px-6 py-3 bg-red-500 rounded hover:bg-red-600 transition duration-300 ease-in-out"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

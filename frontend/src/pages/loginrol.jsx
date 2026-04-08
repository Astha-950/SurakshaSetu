import { useNavigate } from "react-router-dom";

function loginrol() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#7A2F46] to-[#9F425E] p-4">
      
      <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-4 w-full max-w-sm">
        
        <button
          onClick={() => navigate("/login")}
          className="w-full py-3 rounded-xl font-semibold text-[#7A2F46] border border-[#7A2F46] hover:bg-[#7A2F46] hover:text-white transition duration-300"
        >
          User Login
        </button>

        <button
          onClick={() => navigate("/ngo-login")}
          className="w-full py-3 rounded-xl font-semibold text-[#7A2F46] border border-[#7A2F46] hover:bg-[#7A2F46] hover:text-white transition duration-300"
        >
          NGO Login
        </button>

      </div>
      
    </div>
  );
}

export default loginrol;
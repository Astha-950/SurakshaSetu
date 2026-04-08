import { useNavigate } from "react-router-dom";

function signuprole() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#7A2F46] to-[#9F425E] p-4">
      
      <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-4 w-full max-w-sm">
        
        <button
          onClick={() => navigate("/register")}
          className="w-full py-3 rounded-xl font-semibold text-[#7A2F46] border border-[#7A2F46] hover:bg-[#7A2F46] hover:text-white transition duration-300"
        >
          User Signup
        </button>

        <button
          onClick={() => navigate("/ngo-register")}
          className="w-full py-3 rounded-xl font-semibold text-[#7A2F46] border border-[#7A2F46] hover:bg-[#7A2F46] hover:text-white transition duration-300"
        >
          NGO Signup
        </button>

      </div>
      
    </div>
  );
}

export default signuprole;
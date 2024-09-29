import { useState } from "react";
import PasswordInput from "../../components/Input/PasswordInput.jsx";
import NavBar from "../../components/NavBar/NavBar.jsx";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper.js";
import { axiosInstance } from "../../utils/axiosInstance.js";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      return setError("please enter a valid email address.");
    }
    if (!password) {
      setError("please enter your password ");
      return;
    }
    setError("");
    try {
      const res = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });
      if (res.data && res.data.accessToken) {
        localStorage.setItem("token", res.data.accessToken);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error happened . please try again ");
      }
    }
  };
  return (
    <>
      <NavBar />
      <div className="flex items-start justify-center mt-20 ">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Login</h4>
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            <button type="submit" className="btn-primary">
              Login
            </button>
            <p className="text-sm text-center mt-4">
              Not registered yet ?
              <Link to="/signup" className="font-medium text-primary underline">
                Create account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;

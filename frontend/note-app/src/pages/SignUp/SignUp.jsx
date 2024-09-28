import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar.jsx";
import PasswordInput from "../../components/Input/PasswordInput.jsx";
import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper.js";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!name) {
      setError("please enter your name");
      return;
    }
    if (!validateEmail(email)) {
      setError("please enter valid email address");
      return;
    }
    if (!password) {
      setError("please enter your password");
      return;
    }
    setError("");
  };
  return (
    <>
      <NavBar />
      <div className="flex items-start justify-center mt-20 ">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">Sign up</h4>

            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              Already have an account ?
              <Link to="/log-in" className="font-medium text-primary underline">
                LogIn
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;

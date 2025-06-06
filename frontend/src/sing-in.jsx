import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // lähetetään käyttäjän tiedot backendiin kirjautumista varten
      const res = await axios.post("/api/v1/auth/sign-in", { email, password });
      // Tallenna token ja käyttäjätiedot
      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("userId", res.data.data.user._id);
      // Ohjaa käyttäjä eteenpäin etusivulle
      navigate("/home");
    } catch (err) {
      setError("Kirjautuminen epäonnistui");
    }
  };
    return (
      <>
          <div className="flex flex-1 flex-col justify-center m-0">
            <div className="relative isolate overflow-hidden bg-slate-800 md:w-2/3 md:mx-auto md:mt-10 mx-10 mt-10 p-10 shadow-2xl rounded-3xl">

              <div className="">
                <h2 className="text-4xl font-bold tracking-wide text-slate-200">
            Sign In
          </h2>
          <p className="mt-4 text-slate-200 text-xl tracking-wide font-semibold">Sign in to view your subscriptions</p>
        </div>

        <div className="mt-7">
          <form onSubmit={handleSubmit} method="POST" className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="email" className="block text-base tracking-wide text-white font-semibold">
                  Email
                </label>
              </div>
              <div className="mt-2">
                <input value={email} onChange={e => setEmail(e.target.value)}
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full lg:w-2/3 rounded-xl bg-white px-4 py-2 text-lg text-gray-900 outline-2 -outline-offset-1 outline-amber-500 placeholder:text-gray-400 focus:outline-3 focus:-outline-offset-2 focus:outline-sky-400"
                />
              </div>
            </div>

            <div>
              <div className="mt-7 flex items-center justify-between">
                <label htmlFor="password" className="block text-base tracking-wide text-white font-semibold">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input value={password} onChange={e => setPassword(e.target.value)}
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full lg:w-2/3 rounded-xl bg-white px-4 py-2 text-lg text-gray-900 outline-2 -outline-offset-1 outline-amber-500 placeholder:text-gray-400 focus:outline-3 focus:-outline-offset-2 focus:outline-sky-400"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="mt-10 rounded-xl tracking-wide flex transform transition-transform duration-100 hover:scale-105 active:scale-95 justify-center rounded-md bg-amber-500 px-10 py-2 text-lg font-semibold text-white shadow-xs hover:bg-sky-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Sign in
              </button>
            </div>
            {error && <div className="mt-4 text-red-500 tracking-wide font-semibold">{error}</div>}
          </form>

          <p className="mt-10 text-base tracking-wide text-white font-semibold">{/* Linkki rekisteröitymis sivulle */}
            Not a member?{' '}
            <Link to="/sign-up" className="text-sky-400 tracking-wide font-bold text-base hover:text-sky-500">
              Sign up here!
            </Link>
          </p>
        </div>
        </div>
      </div>
      </>
    )
}

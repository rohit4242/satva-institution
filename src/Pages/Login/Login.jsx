import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import GoogleButton from "react-google-button";
import { useUserAuth } from "../../Context/AuthContext";
import { db } from "../../firebase";
import { ref, onValue } from "firebase/database";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { logIn } = useUserAuth();
  const navigate = useNavigate();

  let role, emails;

  const dbRef = ref(db, "UserInfo/");
  onValue(
    dbRef,
    (snapshot) => {
      snapshot.forEach((user) => {
        if (user.val().email === email) {
          emails = user.val().email;
          role = user.val().role;
        }
      });
    },
    {
      onlyOnce: true,
    }
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log(emails, role);
    if (role === "admin" && emails) {
      try {
        setLoading(true);
        await logIn(email, password);
        navigate("/AdminDashboard");
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    }
    if (role === "teacher" && emails) {
      try {
        setLoading(true);

        await logIn(email, password);
        navigate("/TeacherDashboard");
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    }
    if (role === "student" && emails) {
      try {
        setLoading(true);

        await logIn(email, password);
        navigate("/StudentDashboard");
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#hello"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Flowbite
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Your email
                </label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5"
                  placeholder="Enter your email"
                  required=""
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Password
                </label>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-teal-600 focus:border-teal-600 block w-full p-2.5 "
                  required=""
                />
              </div>
              {error && <p className="text-2xl text-slate-900">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full text-white bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-teal-800"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

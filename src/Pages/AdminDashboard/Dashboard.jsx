import { useNavigate } from "react-router";
import { useUserAuth } from "../../Context/AuthContext";

const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
      console.log(user);

    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="p-4 mt-3 text-center">
        Hello Welcome this is Admin Dashboard {user.email} <br />
      </div>
      <div className="text-center">
        <button className="w-20 text-center rounded-md bg-slate-500" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </>
  );
};

export default Home;
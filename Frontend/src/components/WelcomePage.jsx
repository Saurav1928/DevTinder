import { useEffect } from "react";
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

const WelcomePage = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/"); // Redirect to feed if user is logged in
    }
  }, [user, navigate]); // Runs when 'user' or 'navigate' changes

  return (
    !user && (
      <div className="flex flex-col items-center justify-around  h-screen bg-base-200">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-primary">
            Welcome to DevTinder
          </h1>
          <p className="py-6 text-lg">
            Connecting developers from all over the world. Join us and find your
            next coding partner or collaboration opportunity.
          </p>
          <div className="flex space-x-4 justify-center">
            <Link to="/signup">
              <button className="btn btn-primary">Sign Up</button>
            </Link>
            <Link to="/login">
              <button className="btn btn-secondary">Login</button>
            </Link>
          </div>
        </div>
      </div>
    )
  );
};

export default WelcomePage;

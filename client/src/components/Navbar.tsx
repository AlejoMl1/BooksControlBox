import { Link } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import { RootState } from "../redux/store";
import { removeUserCredentials } from "../redux/userSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.user.username);

  const handleLogout = () => {
      dispatch(removeUserCredentials());
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Books ControlBox
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <div className="d-flex align-items-center"> {/* Use flex display */}
                {username && (
                  <>
                    <p className="nav-link text-white mb-0">Welcome {username}</p>
                    <Link className="nav-link" onClick={handleLogout} to="/login">
                      Log Out
                    </Link>
                  </>
                )}
              </div>
            </li>
            {!username && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Log In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

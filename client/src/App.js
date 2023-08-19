import { React, useState } from "react";
import "./App.css";
import Login from "./components/Login";
import SignIn from "./components/SignIn";
import NavBar from "./components/Navbar";
function App() {
  const [showLogInForm, setShowLogInForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  const handleLogInClick = () => {
    setShowLogInForm(true);
    setShowSignUpForm(false);
  };

  const handleSignUpClick = () => {
    setShowSignUpForm(true);
    setShowLogInForm(false);
  };
  return (
    <>
      <NavBar
        onLogInClick={handleLogInClick}
        onSignUpClick={handleSignUpClick}
      />
      {showLogInForm && <Login />}
      {showSignUpForm && <SignIn />}
      <div className="container"></div>
    </>
  );
}

export default App;

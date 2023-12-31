import { BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import BookDetails from "./components/BookDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />  
        <Route path="/home" element={<Home />} />  
        <Route path="/bookDetails" element={<BookDetails/>} />  
      </Routes>
    </BrowserRouter>
  );
}

export default App;

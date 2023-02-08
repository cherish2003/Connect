import "./App.css";
import Login from "./Pages/Login";
import MainPage from "./Pages/MainPage";
import Register from "./Pages/Register";
import { Navigate, Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Register" element={<Register />}></Route>
        <Route path="/MainPage" element={currentUser ? <MainPage/> : <Login/>}></Route> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;

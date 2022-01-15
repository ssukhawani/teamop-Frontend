import "./App.css";
import { BrowserRouter, Route,Routes } from "react-router-dom";
import Home from "Pages/Home/Home";
import Login from "Pages/Login/Login";
import Register from "Pages/Register/Register";
import ProtectedRoute from "Routes/protected-route";


function App() {
  const isLoggedIn = false;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>  
        <Route path="/register" element={<Register />}/>
        <Route element={<ProtectedRoute/>}>
          <Route path="/home" element={<Home />}/>
        </Route>
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;

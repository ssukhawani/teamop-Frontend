import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "Pages/Home/Home";
import Login from "Pages/Login/Login";
import Register from "Pages/Register/Register";
import Detail from "Pages/DetailView/Detail";
import ProtectedRoute from "Routes/protected-route";
import SelectComponent from "Shared/Components/Select";
import EvCard from "Components/EvCard/EvCard.";
import BookingSucess from "Pages/BookingSucess/BookingSucess";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route exact path="/detail/:id" element={<Detail />} />
          <Route path="/evcard" element={<EvCard />}/>
          <Route path="/success" element={<BookingSucess />}/>
        </Route>
        <Route path="/select" element={<SelectComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

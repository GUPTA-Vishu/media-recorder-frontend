import LoginPage from "./Components/LoginPage";
import SignUp from "./Components/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/LoginPage" element={<LoginPage />} />
         <Route path="/Home" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

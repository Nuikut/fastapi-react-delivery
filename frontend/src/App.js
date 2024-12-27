import { Routes, Route, Navigate } from "react-router-dom";
import Login from './components/Login/Login';
import SignUp from './components/SignUp';
import Profile from "./components/Profile/Profile";
import Main from "./components/Main/Main";
import Admin from "./components/Admin/Admin";
import AdminLogin from "./components/AdminLogin";
import Cart from "./components/Cart";
import Staff from "./components/Staff/Staff";
import Manager from "./components/Manager/Manager";
import About from "./components/About/About";

// TODO: Отовсрать фронт
// TODO: CSS
function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/menu" element={<Main/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/staff" element={<Staff/>}/>
                <Route path="/manager" element={<Manager/>}/>
                <Route path="/staff/login" element={<Login type={"staff"}/>}/>
                <Route path="/manager/login" element={<Login type={"manager"}/>}/>
                <Route path="/root" element={<Admin/>}/>
                <Route path="/root/login" element={<AdminLogin/>}/>
                <Route path="*" element={<Navigate to={'/menu'}/> }></Route>
        </Routes>
      </div>
  );
}

export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from "./components/Profile/Profile";
import Main from "./components/Main/Main";
import Menu from "./components/Menu";
import Admin from "./components/Admin/Admin";
import AdminLogin from "./components/AdminLogin";
import Cart from "./components/Cart/Cart";
import Staff from "./components/Staff/Staff";

// TODO: Отовсрать фронт
// TODO: CSS
function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/main" element={<Main/>}/>
                <Route path="/menu" element={<Menu/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/staff" element={<Staff/>}/>
                <Route path="/staff/login" element={<Login type={"staff"}/>}/>
                <Route path="/root" element={<Admin/>}/>
                <Route path="/root/login" element={<AdminLogin/>}/>
                <Route path="*" element={<Navigate to={'/main'}/> }></Route>
        </Routes>
      </div>
  );
}

export default App;

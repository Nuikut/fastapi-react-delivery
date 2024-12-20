import { Routes, Route, Navigate } from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from "./components/Profile";
import Main from "./components/Main";
import Menu from "./components/Menu";

// TODO: Отовсрать фронт
// TODO: CSS
function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/menu" element={<Main/>}/>
                <Route path="*" element={<Navigate to={'/menu'}/> }></Route>
        </Routes>
      </div>
  );
}

export default App;

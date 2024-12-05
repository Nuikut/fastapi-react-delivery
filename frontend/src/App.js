import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from "./components/Profile";

// TODO: Отовсрать фронт
// TODO: CSS
function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="*" element={<Navigate to={'/profile'}/> }></Route>
        </Routes>
      </div>
  );
}

export default App;

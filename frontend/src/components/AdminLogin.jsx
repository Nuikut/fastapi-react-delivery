import {useState} from 'react'
import {useNavigate} from "react-router-dom";
import {loginAdmin} from "../api/admin";


export default function AdminLogin() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const loginUserHandler = async (e) => {
        e.preventDefault();

        const status = await loginAdmin(login, password);
        switch (status) {
            case 'Fail':
                setError('Неверный пароль');
                break;
            default:
                setError('');
                navigate("/root");
        }
    }

    return (
        <div className="Login">
            <h1 className="Title">Вход Админа</h1>

            <form onSubmit={loginUserHandler}>
                <div className="Form">
                <input className="loginForm"
                    type="text"
                    placeholder="Логин"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    minLength={1}
                    maxLength={32}
                    required
                />
                <input className="loginForm"
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </div>
                <button className="loginButton" type="submit">Log in</button>
                {error && <div style={{color: 'red'}}>{error}</div>}
            </form>
        </div>
    )
}

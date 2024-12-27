import {useState} from 'react';
import {loginUser} from "../../api/auth";
import {loginStaff} from "../../api/auth";
import {loginManager} from "../../api/auth";
import {Link, useNavigate} from "react-router-dom";
import './Login.css'

export default function Login({type = "user"}) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [restaurant, setRestaurant] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const loginHandler = async (e) => {
        e.preventDefault();
        let status;

        if (type === "staff") {
            status = await loginStaff(login, password);
        } else if (type === "manager") {
            status = await loginManager(login, password, restaurant);
        } else {
            status = await loginUser(login, password);
        }

        switch (status) {
            case 'Fail':
                setError('Неверные данные');
                break;
            case 'Blocked':
                setError('Аккаунт был заблокирован');
                break;
            default:
                setError('');
                if (type === "staff") {
                    navigate("/staff");
                } else if (type === "manager") {
                    navigate("/manager");
                } else {
                    navigate("/main");
                }
        }
    };

    return (
        <div className="Login">
            <h1 className="Title">
                {type === "staff"
                    ? "Авторизация персонала"
                    : type === "manager"
                        ? "Авторизация менеджеров"
                        : "Авторизация пользователей"}
            </h1>

            <form onSubmit={loginHandler} >
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
                {type === "manager" &&
                    <input className="loginForm"
                        type="text"
                        placeholder="Ресторан"
                        value={restaurant}
                        onChange={(e) => setRestaurant(e.target.value)}
                        required
                    />
                }
                </div>
                {type === "staff" &&
                    <button className="loginButton" style={{background:"#0077FF54"}} type="submit">Войти</button>}
                {type === "manager" &&
                    <button className="loginButton" style={{background:"#AF4C7EFF"}} type="submit">Войти</button>}
                {type === "user" &&
                    <button className="loginButton" type="submit">Войти</button>}

                {error && <div style={{color: 'red', textAlign:"center"}}>{error}</div>}
                <div className="hints">
                    {type === "user" && (
                        <p className="hint">
                            Нет аккаунта? <Link to="/signup">Зарегистрироваться</Link>
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
}

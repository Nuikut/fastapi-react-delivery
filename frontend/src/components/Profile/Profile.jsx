import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {updateUserInfo, validateToken} from "../../api/auth";
import {jwtDecode} from 'jwt-decode'
import Header from ".././Header/Header";
import {getActiveOrders, getHistoryOrders} from "../../api/cart";
import Orders from "../Orders/Orders";


export default function Profile() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [username, setUsername] = useState('');
    const [open, setOpen] = useState(false);
    const [history, setHistory] = useState([]);
    const [error, setError] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('access_token');
            const isValid = await validateToken(token);

            if (!isValid)
                navigate("/login");
            else {
                const decoded = jwtDecode(token);
                if (decoded.iat + 900 < Math.floor(Date.now() / 1000))
                    navigate("/login");
                else if (decoded.sub) {
                    setUsername(decoded.sub);
                }
            }
        };
        checkToken();
    }, [navigate]);

    useEffect(() => {
        if (username) {
            loadOrders();
        }
    }, [username]);

    const logout_user = async () => {
        navigate('/main');
        localStorage.clear();
    }

    const loadOrders = async () => {
        const data = await getActiveOrders(username);
        setOrders(data['order']);
        const response = await getHistoryOrders(username);
        setHistory(response['order']);
    }

    const buttonHandle = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
        });
        setOpen(!open)
    }

    const handleUpdateInfo = async (e) => {
        e.preventDefault();

        if (newPassword !== passwordConfirmation) {
            setError('Пароли не совпадают')
            return;
        }


        const result = await updateUserInfo(localStorage.getItem('access_token'), username, newPassword, newUsername);
        if (result === 'Success') {
            setError('Успешно изменено, изменения вступят в силу после логина');
            setUsername(newUsername || username);
            setNewUsername('');
            setNewPassword('');
            setPasswordConfirmation('');
        }

        else if (result === 'Username taken') {
            setError('Такое имя уже занято')
        }
        else {
            setError('Не удалось обновить информацию')
        }
    };

    return (
        <div className="Profile">
            <Header name={username} children={
                <div className="restaurantButton">
                    <button onClick={() => (logout_user())}>Выйти</button>
                </div>
            }>
            </Header>
            <div className="Bio" style={{marginTop: "100px", fontSize: "20px"}}>
                <p style={{textAlign: "right", marginRight: "20px"}}>Привет {username}!👋</p>
                <h3 style={{textAlign: "center"}}>Изменить данные</h3>
                {error && <p style={{textAlign: "center"}}>{error}</p>}
                <form onSubmit={handleUpdateInfo}>
                    <div style={{marginLeft: "20px", maxWidth: "300px", marginBottom: "15px"}}>
                        <label htmlFor="newUsername" style={{display: 'block', width: '100%'}}>Новый логин:</label>
                        <input
                            type="text"
                            id="newUsername"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            placeholder="Введите новый логин"
                            style={{
                                width: '100%',
                                padding: '10px',
                                fontSize: '16px',
                                borderRadius: '4px',
                                border: '1px solid #ddd'
                            }}
                        />
                    </div>
                    <div style={{marginLeft: "20px", maxWidth: "300px", marginBottom: "15px"}}>
                        <label htmlFor="newPassword" style={{display: 'block', width: '100%'}}>Новый пароль:</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Введите новый пароль"
                            style={{
                                width: '100%',
                                padding: '10px',
                                fontSize: '16px',
                                borderRadius: '4px',
                                border: '1px solid #ddd'
                            }}
                        />
                    </div>
                    <div style={{marginLeft: "20px", maxWidth: "300px", marginBottom: "15px"}}>
                        <label htmlFor="passwordConfirmation" style={{display: 'block', width: '100%'}}>Подтверждение
                            пароля:</label>
                        <input
                            type="password"
                            id="passwordConfirmation"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            placeholder="Подтвердите новый пароль"
                            style={{
                                width: '100%',
                                padding: '10px',
                                fontSize: '16px',
                                borderRadius: '4px',
                                border: '1px solid #ddd'
                            }}
                        />
                    </div>
                    <button type="submit" style={{
                        marginLeft:"20px",
                        marginTop: "20px",
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: '#fd7e4f',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}>
                        Обновить данные
                    </button>
                </form>

            </div>

            <div className="collapsibleContent">
                {orders === 'No active orders' ?
                    <p style={{marginTop: "100px", textAlign: "center", fontSize: "20px"}}>У вас нет активных заказов</p>
                    :
                    <div>
                        <h2 style={{marginTop: "100px", textAlign: "center"}}>Ваши заказы</h2>
                        <h3 style={{marginLeft: "150px"}}>Список активных заказов</h3>
                        <Orders orders={orders}></Orders>
                    </div>
                }
                <button className="collapsibleButton" onClick={() => (buttonHandle())}>Прошлые заказы ↓</button>
                {open && <Orders orders={history}/>}
            </div>
        </div>
    )
}

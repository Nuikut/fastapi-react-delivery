import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {validateToken} from "../../api/auth";
import {jwtDecode} from 'jwt-decode'
import Header from ".././Header/Header";
import {getOrders} from "../../api/cart";


export default function Profile() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [username, setUsername] = useState('');

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
                if (decoded.sub)
                    setUsername(decoded.sub);
            }
        };
        checkToken();
    }, [navigate]);

    const logout_user = async () => {
        navigate('/main');
        localStorage.clear();
    }

    const loadOrders = async () => {
        const data = await getOrders();
        setOrders(data);
    }

    return (
        <div className="Profile">
            <Header name={username} children={
                <div className="restaurantButton">
                    <button onClick={() => (logout_user())}>Выйти</button>
                </div>
            }>
            </Header>
            <button className="GetData" onClick={() => loadOrders()}>Ya</button>

        </div>
    )
}

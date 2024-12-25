import {useEffect, useState} from "react";
import {validateToken} from "../../api/auth";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";
import './Staff.css'
import Orders from "../Orders/Orders";
import {getActiveStaffOrders, getHistoryStaffOrders} from "../../api/staff";
import {getHistoryOrders} from "../../api/cart";

export default function Staff() {
    const [username, setUsername] = useState('');
    const [orders, setOrders] = useState([]);
    const [history, setHistory] = useState([]);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('staff_token');

            const isValid = await validateToken(token);

            if (!isValid)
                navigate("/staff/login");
            else {
                const decoded = jwtDecode(token);
                if (decoded.iat + 900 < Math.floor(Date.now() / 1000))
                    navigate("/staff/login");
                if (decoded.sub) {
                    setUsername(decoded.sub);
                }
            }
        };
        checkToken();
    }, [navigate]);

    const buttonHandle = async () => {
        const status = await getHistoryStaffOrders(username);
        if (status['order'] !== 'Fail') {
            setHistory(status['order']);
        }
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
        });
        setOpen(!open)
    }

    useEffect(() => {
        const getOrders = async () => {

            if (username) {
                const status = await getActiveStaffOrders(username);
                console.log(status);
                if (status['order'] !== 'Fail') {
                    setOrders(status['order']);
                }
                const data = await getHistoryOrders(username);
                console.log(data['order']);
                if (data['order'] !== 'Fail') {
                    setHistory(data['order']);
                }
            }
        }
        getOrders();
    }, [username, refresh]);

    const logout_staff = async () => {
        navigate('/main');
        localStorage.clear();
    }

    const updateOrders = async () => {
        setRefresh(!refresh)
    };

    return (
        <div className="StaffPage">
            <header className="StaffHeader">
                <p className="StaffUsername">Здравствуй {username}!</p>
                <div style={{marginLeft: "auto", marginRight: "15px"}}>
                    <button className="Logout" onClick={() => (logout_staff())}>Выйти</button>
                </div>
            </header>
            <div style={{marginTop:"50px"}}>
                {orders && orders.length > 0 ? <Orders orders={orders} staff={true} onOrderUpdate={updateOrders}/> : null}
            </div>
            <button className="collapsibleButton" style={{background:"#0077FF54", color:"black"}} onClick={() => (buttonHandle())}>Прошлые заказы</button>
            {open && <Orders orders={history}/>}
        </div>
    )
};
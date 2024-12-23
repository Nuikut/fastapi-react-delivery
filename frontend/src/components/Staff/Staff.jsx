import {useEffect, useState} from "react";
import {validateToken} from "../../api/auth";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";
import './Staff.css'

export default function Staff() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

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
                if (decoded.sub)
                    setUsername(decoded.sub);
            }
        };
        checkToken();
    }, [navigate]);

    const logout_staff = async () => {
        navigate('/main');
        localStorage.clear();
    }

    return (
        <div className="StaffPage">
            <header className="StaffHeader">
                <p className="StaffUsername">Здравствуй {username}!</p>
                    <button className="Logout" onClick={() => (logout_staff())}>Выйти</button>
            </header>
        </div>
    )
};
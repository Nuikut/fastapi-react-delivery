import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {validateToken} from "../api/auth";
import {jwtDecode} from 'jwt-decode'
import Header from "../components/Header";

export default function Profile() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('access_token');

            const isValid = await validateToken(token);

            if (!isValid)
                navigate("/login");

            const decoded = jwtDecode(token);
            if (decoded.iat + 900 < Math.floor(Date.now() / 1000))
                navigate("/login");
            if (decoded.sub)
                setUsername(decoded.sub);
        };
        checkToken();
    }, [navigate]);

    return(
        <div className="Profile">
            <Header name={username}></Header>
        </div>
    )
}

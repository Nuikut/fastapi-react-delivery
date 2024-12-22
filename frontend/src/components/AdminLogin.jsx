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
                setError('Invalid login credentials');
                break;
            default:
                setError('');
                navigate("/admin");
        }
    }

    return (
        <div className="Login">
            <h1>Login</h1>

            <form onSubmit={loginUserHandler}>
                <input
                    type="text"
                    placeholder="Username"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    minLength={1}
                    maxLength={32}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Log in</button>
                {error && <div style={{color: 'red'}}>{error}</div>}
            </form>
        </div>
    )
}

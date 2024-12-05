import {useState} from 'react'
import {loginUser} from "../api/auth";
import {Link, useNavigate} from "react-router-dom";


export default function Login() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const loginUserHandler = async (e) => {
        e.preventDefault();

        const status = await loginUser(login, password);

        switch (status) {
            case 'Fail':
                setError('Invalid login credentials');
                break;
            case 'Blocked':
                setError('This account has been blocked');
                break;
            default:
                setError('');
                navigate("/profile");
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
                <div className="hints">
                    <p className="hint">
                        Don't have an account? <Link to="/signup">Sign up</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

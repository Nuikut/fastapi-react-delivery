import {useState} from 'react'
import {registerUser} from "../api/auth";
import {useNavigate} from "react-router-dom";


export default function SignUp() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const signUpHandler = async (e) => {
        e.preventDefault();

        const status = await registerUser(login, password);

        switch (status) {
            case 'Fail':
                setError('Invalid login credentials');
                break;
            case 'Blocked':
                setError('This account has been blocked');
                break;
            default:
                setError('');
                navigate("/login");
        }
    }

    return (
        <div className="SignUp">
            <h1>Login</h1>

            <form onSubmit={signUpHandler}>
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

                <button type="submit">Sign Up</button>
                {error && <div style={{color: 'red'}}>{error}</div>}
            </form>
        </div>
    )
}

import {useState} from 'react';
import {loginUser} from "../api/auth";
import {loginStaff} from "../api/auth";
import {Link, useNavigate} from "react-router-dom";

export default function Login({type = "user"}) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const loginHandler = async (e) => {
        e.preventDefault();
        let status;

        if (type === "staff") {

            status = await loginStaff(login, password);
        } else {

            status = await loginUser(login, password);
        }

        switch (status) {
            case 'Fail':
                setError(type === "staff" ? 'Invalid employee credentials' : 'Invalid user credentials');
                break;
            case 'Blocked':
                setError(type === "staff" ? 'This staff account has been blocked' : 'This account has been blocked');
                break;
            default:
                setError('');
                if (type === "staff") {
                    navigate("/staff");
                } else {
                    navigate("/profile");
                }
        }
    };

    return (
        <div className="Login">
            <h1>{type === "staff" ? "Staff Login" : "User Login"}</h1>

            <form onSubmit={loginHandler}>
                <input
                    type="text"
                    placeholder={type === "staff" ? "Staff ID" : "Username"}
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
                    {type === "staff" ? (
                        <div></div>
                    ) : (
                        <p className="hint">
                            Don't have an account? <Link to="/signup">Sign up</Link>
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
}

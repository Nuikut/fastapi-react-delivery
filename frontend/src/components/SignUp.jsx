import {registerUser} from "../api/auth";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Register() {
    const [newPassword, setNewPassword] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleUpdateInfo = async (e) => {
        e.preventDefault();

        if (newPassword !== passwordConfirmation) {
            setError('Пароли не совпадают')
            return;
        }

        const updatedData = {};
        if (newUsername) updatedData.username = newUsername;
        if (newPassword) updatedData.password = newPassword;

        const result = await registerUser(newUsername, newPassword);
        if (result === 'Success') {
            navigate('/login');
        } else if (result === 'Fail') {
            setError('Это имя уже занято')
        } else {
            setError('Не удалось создать аккаунт ')
        }
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
        }}>
            {error && <p style={{marginLeft: "30px"}}>{error}</p>}
            <form onSubmit={handleUpdateInfo}>
                <div className="Forma">
                    <div style={{marginLeft: "20px", maxWidth: "600px", marginBottom: "15px"}}>
                        <label htmlFor="newUsername" style={{display: 'block', width: '100%'}}>Логин:</label>
                        <input
                            type="text"
                            id="newUsername"
                            required="true"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            placeholder="Введите логин"
                            style={{
                                width: '100%',
                                padding: '10px',
                                fontSize: '16px',
                                borderRadius: '4px',
                                border: '1px solid #ddd'
                            }}
                        />
                    </div>
                    <div style={{marginLeft: "20px", maxWidth: "600px", marginBottom: "15px"}}>
                        <label htmlFor="newPassword" style={{display: 'block', width: '100%'}}>Пароль:</label>
                        <input
                            type="password"
                            id="newPassword"
                            required="true"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Введите пароль"
                            style={{
                                width: '100%',
                                padding: '10px',
                                fontSize: '16px',
                                borderRadius: '4px',
                                border: '1px solid #ddd'
                            }}
                        />
                    </div>
                    <div style={{marginLeft: "20px", maxWidth: "600px", marginBottom: "15px"}}>
                        <label htmlFor="passwordConfirmation" style={{display: 'block', width: '100%'}}>Подтверждение
                            пароля:</label>
                        <input
                            type="password"
                            id="passwordConfirmation"
                            required="true"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            placeholder="Подтвердите свой пароль"
                            style={{
                                width: '100%',
                                padding: '10px',
                                fontSize: '16px',
                                borderRadius: '4px',
                                border: '1px solid #ddd'
                            }}
                        />
                    </div>
                </div>
                <button type="submit" style={{
                    marginLeft: "40px",
                    marginTop: "20px",
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#fd7e4f',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}>
                    Зарегистрироваться
                </button>
            </form>
        </div>
    )
}
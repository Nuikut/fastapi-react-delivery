import './CreateStaff.css'
import {useState} from "react";
import {createStaff} from "../../api/admin";

export default function CreateStaff() {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [restaurant, setRestaurant] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!login || !password || !restaurant) {
            setError('Пожалуйста, заполните все поля!');
            return;
        }
        try {

            const newStaff = await createStaff(login, password, restaurant);
            setError(newStaff);
        } catch (err) {
            console.error(err);
            setError('Ошибка при добавлении сотрудника.');
        }
    };

    return (
        <div className="createStaff">
            <p>Добавить нового сотрудника</p>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="login">Логин</label>
                    <input
                        type="text"
                        id="login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        placeholder="Введите логин"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Введите пароль"
                    >
                    </input>
                </div>

                <div className="form-group">
                    <label htmlFor="restaurant">Ресторан</label>
                    <input
                        type="text"
                        id="restaurant"
                        value={restaurant}
                        onChange={(e) => setRestaurant(e.target.value)}
                        placeholder="Введите название ресторана"
                    />
                </div>
                <button type="submit" className="submitButton">
                    Добавить
                </button>
            </form>
        </div>
    )
}
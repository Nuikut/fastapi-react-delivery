import './CreateRestaurant.css'
import {useState} from "react";
import {createRestaurant} from "../../api/admin";

export default function CreateRestaurant() {
    const [address, setAddress] = useState('');
    const [category, setCategory] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!address || !category ||!login || !password) {
            setError('Пожалуйста, заполните все поля!');
            return;
        }
        try {
            const newStaff = await createRestaurant(address, category, login, password);
            setError(newStaff);
        } catch (err) {
            console.error(err);
            setError('Ошибка при добавлении ресторана.');
        }
    };

    return (
        <div className="createStaff">
            <p>Добавить новый ресторан</p>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="restaurant">Ресторан</label>
                    <input
                        type="text"
                        id="restaurant"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Введите адрес ресторана"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Категория</label>
                    <input
                        type="text"
                        id="restaurant"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Введите категорию ресторана"
                    />
                </div>
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
                <button type="submit" className="submitButton">
                    Добавить
                </button>
            </form>
        </div>
    )
}
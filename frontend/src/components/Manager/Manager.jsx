import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import {deleteStaff, createMeal, updateStaff} from "../../api/manager";
import {validateToken} from "../../api/auth";
import {createStaff, getStaff} from "../../api/admin";
import StaffList from "../StaffList/StaffList";
import './Manager.css'


export default function Manager() {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [newLogin, setNewLogin] = useState('');
    const [password, setPassword] = useState('');
    const [mealCategory, setMealCategory] = useState("");
    const [mealName, setMealName] = useState("");
    const [mealDescription, setMealDescription] = useState("");
    const [mealPrice, setMealPrice] = useState("");
    const [refresh, setRefresh] = useState(true);


    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem("manager_token");

            const isValid = await validateToken(token);

            if (!isValid) navigate("/manager/login");
            else {
                const decoded = jwtDecode(token);
                if (decoded.iat + 900 < Math.floor(Date.now() / 1000)) navigate("/manager/login");
            }
        };
        checkToken();
    }, [navigate, refresh]);

    const drop = async () => {
        setRefresh(false);
        setLogin('');
        setMealCategory('');
        setMealName('');
        setMealDescription('');
        setMealPrice('');
        setPassword('');
    }

    const logout_manager = async () => {
        navigate('/main');
        localStorage.clear();
    }

    const handleUpdateStaff = async (login, newLogin, password) => {
        const response = await updateStaff(login, newLogin, password, localStorage.getItem('manager_restaurant'));
        drop();
        if (response.status === "Success")
            setRefresh(!refresh)
    };

    const handleAddStaff = async (login, password) => {
        await createStaff(login, password, localStorage.getItem("manager_restaurant"));
        setRefresh(!refresh);
        drop();
    };


    const handleAddMeal = async () => {
        await createMeal(mealName, mealDescription, mealPrice, mealCategory, true, localStorage.getItem('manager_restaurant'));
    };


    useEffect(() => {
        getStaff();
    }, []);

    return (
        <div className="ManagerPage">
            <header className="StaffHeader" style={{background: "#AF4C7EFF"}}>
                <div style={{marginLeft: "auto", marginRight: "15px"}}>
                    <button className="Logout" style={{margin: "30px"}} onClick={() => (logout_manager())}>Выйти
                    </button>
                </div>
            </header>
            <h1>Страница менеджера</h1>
            <div className="manager-forms">
                <div className="add-staff-form" style={{flexGrow:"1"}}>
                    <h2>Добавить сотрудника</h2>
                    <input
                        type="text"
                        placeholder="Логин"
                        onChange={(e) => setLogin(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="add-staff" onClick={() => handleAddStaff(login, password)}>Добавить сотрудника
                    </button>
                </div>

                <div className="update-staff-form">
                    <h2>Обновить данные сотрудника</h2>
                    <input
                        type="text"
                        placeholder="Логин сотрудника"
                        onChange={(e) => setLogin(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Новый логин"
                        onChange={(e) => setNewLogin(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Новый пароль"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="add-staff"
                            onClick={() => handleUpdateStaff(login, newLogin, password)}>Обновить сотрудника
                    </button>

                </div>
                <div className="add-meal-form">
                    <h2>Добавить блюдо</h2>
                    <input
                        type="text"
                        placeholder="Название блюда"
                        value={mealName}
                        onChange={(e) => setMealName(e.target.value)}
                    />
                    <textarea style={{resize:"vertical", maxHeight:"150px", minHeight:"30px"}}
                        placeholder="Описание блюда"
                        value={mealDescription}
                        onChange={(e) => setMealDescription(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Цена"
                        value={mealPrice}
                        onChange={(e) => setMealPrice(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Категория"
                        value={mealCategory}
                        onChange={(e) => setMealCategory(e.target.value)}
                    />
                    <button className="add-staff" onClick={handleAddMeal}>Добавить блюдо</button>
                </div>
            </div>

            <div className="staff-list">
                <h2>Сотрудники</h2>
                <StaffList restaurant={localStorage.getItem('manager_restaurant')}></StaffList>
            </div>
        </div>
    );
}

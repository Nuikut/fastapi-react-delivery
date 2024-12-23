import {useEffect, useState} from "react";
import {validateToken} from "../../api/auth";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";
import {getStaff} from "../../api/admin";
import './Admin.css';
import StaffList from "../StaffList/StaffList";
import RestaurantsList from "../RestaurantsList/RestaurantsList";
import {getRestaurants} from "../../api/restaurants";
import CreateStaff from "../CreateStaff/CreateStaff";
import CreateRestaurant from "../CreateRestaurant/CreateRestaurant";

export default function Admin() {
    const navigate = useNavigate();
    const [staffArray, setStaffArray] = useState([]);

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('admin_token');

            const isValid = await validateToken(token);

            if (!isValid)
                navigate("/admin/login");
            else {


                const decoded = jwtDecode(token);
                if (decoded.iat + 900 < Math.floor(Date.now() / 1000))
                    navigate("/admin/login");
            }
        };
        checkToken();
    }, []);

    return (
        <div className="AdminPage">
            <div className="AdminHeader">
                <p>Вы на админской панели</p>
            </div>
            <div className="data">
                <StaffList></StaffList>
                <RestaurantsList></RestaurantsList>
                <CreateStaff></CreateStaff>
                <CreateRestaurant></CreateRestaurant>
            </div>
        </div>
    )
}
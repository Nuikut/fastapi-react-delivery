import { useState, useEffect } from "react";
import { getRestaurants } from "../api/restaurants";
import { useNavigate } from "react-router-dom";
import {validateToken} from "../api/auth";


export default function Profile() {
    const [restaurants, setRestaurants] = useState([]);
    const navigate = useNavigate();


    useEffect(() => { //TODO: подумать о валидации на фронте
        const checkToken = async () => {
            const token = localStorage.getItem("access_token");
            const isValid = await validateToken(token);

            if (!isValid) {
                navigate("/login");
            } else {
                const loadRestaurants = async () => {
                    const data = await getRestaurants();
                    setRestaurants(data);
                };
                await loadRestaurants();
            }
        };
        checkToken();
    }, [navigate]);

    const listItems = restaurants.map((restaurant, index) => (
        <li key={index}>{restaurant}</li>
    ));

    return (
        <div className="Restaurants">
            <h1>Restaurants</h1>
            <ul>{listItems}</ul>
        </div>
    );
}

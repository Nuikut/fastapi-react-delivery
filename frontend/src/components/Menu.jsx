import {getMenu} from "../api/restaurants";
import {useEffect, useState} from "react";


export default function Menu({onSendData})  {
    const [menu, setMenu] = useState([]);
    const [cart, setCart] = useState([]);
    const restaurant = localStorage.getItem("userRestaurant");

    const fetchMenu = async (restaurant) => {
        const response = await getMenu(restaurant);
        setMenu(response);
    };

    useEffect(() => {
        fetchMenu(restaurant);
    }, [restaurant]);


    const addToCart = (meal) => {
        const updatedCart = [...cart, meal['name']];
        setCart(updatedCart);
        onSendData(cart);
    };

    return (
        <div className="menu">
            <h2 className="menu-title">Меню</h2>
            <div className="menu-items">
                {menu.map((meal) => (
                    <div className="menu-card">
                        <img src={meal.image} alt={meal.name} className="menu-card-image" />
                        <div className="menu-card-content">
                            <h3 className="menu-card-title">{meal.name}</h3>
                            <p className="menu-card-description">{meal.description}</p>
                            <div className="menu-card-footer">
                                <span className="menu-card-price">{meal.price}₽</span>
                                <span className="menu-card-price">{meal.category}</span>
                                <button className="menu-card-button" onClick={() => (addToCart(meal))}></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
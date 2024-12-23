import {getMenu} from "../api/restaurants";
import {useEffect, useState} from "react";
import LoadingScreen from "./LoadingScreen/LoadingScreen";


export default function Menu({onSendData}) {
    const storedCart = localStorage.getItem('cart');
    const [cart, setCart] = useState(storedCart ? JSON.parse(storedCart) : []);
    const [menu, setMenu] = useState([]);
    const restaurant = localStorage.getItem("userRestaurant");

    const fetchMenu = async (restaurant) => {
        const response = await getMenu(restaurant);
        setMenu(response);
    };

    useEffect(() => {
        fetchMenu(restaurant);
        onSendData(cart);
    }, [restaurant, cart, onSendData]);


    const addToCart = (meal) => {
        const updatedCart = [...cart];
        const existingItem = updatedCart.find(
            (item) => item.name === meal.name && item.price === meal.price
        );

        if (existingItem)
            existingItem.quantity += 1;
        else
           updatedCart.push({...meal, quantity: 1});

        setCart(updatedCart);
        onSendData(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return (
        <div className="menu">
            <h2 className="menu-title">Меню</h2>
            <div className="menu-items">
                {menu && menu.length > 0 ? (menu.map((meal) => (
                    <div className="menu-card">
                        <img src={meal.image} alt={meal.name} className="menu-card-image"/>
                        <div className="menu-card-content">
                            <h3 className="menu-card-title">{meal.name}</h3>
                            <p className="menu-card-description">{meal.description}</p>
                            <div className="menu-card-footer">
                                <span className="menu-card-price">{meal.price}₽</span>
                                <span className="menu-card-price">{meal.category}</span>
                                <button className="menu-card-button" onClick={() => addToCart(meal)}></button>
                            </div>
                        </div>
                    </div>
                )))
                    : <LoadingScreen child={'Получаем меню...'}></LoadingScreen>
                }
            </div>
        </div>
    );
}
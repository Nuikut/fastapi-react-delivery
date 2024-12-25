import {useEffect, useState} from 'react';
import {getRestaurants} from "../../api/restaurants";
import Header from "../Header/Header";
import {Link} from "react-router-dom";
import './Main.css'
import Menu from "../Menu";


function getUserRestaurant() {
    return localStorage.getItem("userRestaurant") || "Выберите ресторан";
}


export default function RestaurantPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cartLength, setCartLength] = useState(0);
    const [restaurants, setRestaurants] = useState([]);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        async function fetchRestaurants() {
            try {
                const data = await getRestaurants();
                setRestaurants(data);
            } catch (error) {
                console.error("Ошибка при получении ресторанов:", error);
            }
        }
        const cookieAccepted = localStorage.getItem("cookie");
        if (!cookieAccepted) {
            setVisible(true);
        }
        fetchRestaurants();
    }, []);

    const handleCartUpdate = (data) => {
        if (data && data.length > 0) {
            const cartLen = data.reduce((currentSum, currentValue) => currentSum + currentValue.quantity, 0);
            setCartLength(cartLen);
        } else {
            setCartLength(0);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    };

    const RestaurantList = () => {
        const selectRestaurant = (restaurantAddress) => {
            localStorage.setItem("userRestaurant", restaurantAddress);
            toggleMenu()
        }

        return (
            <div className='restaurantListContainer'>
                <h2>Наши места:</h2>
                <ul className="restaurantListItem">
                    {restaurants.map((restaurant) => (
                        <div className="restaurantListItem">
                            <li className='restaurantAddress'
                                onClick={() => selectRestaurant(restaurant.address)}> {restaurant.address}<br/></li>
                            <li className='restaurantCuisine' style={{textAlign:'right'}}> {restaurant.category}</li>
                        </div>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <div>
            <Header>
                <div className="restaurantButton">
                    <button onClick={toggleMenu}>{getUserRestaurant()}</button>
                    <div className="cart">
                        <Link to="/cart">
                            <img src="/cart.svg" alt="Корзина"/>
                            <span>{cartLength}</span>
                        </Link>
                    </div>
                </div>
            </Header>
            <div>
                {isMenuOpen && <RestaurantList></RestaurantList>}
            </div>
            <Menu onSendData={handleCartUpdate}></Menu>
            {visible &&
                <div className="cookie-banner">
                <p>
                    Мы используем файлы cookie для улучшения работы сайта. Продолжая пользоваться сайтом, вы
                    соглашаетесь с нашей
                    <a href="/cookie-policy" target="_blank">политикой использования cookie</a>.
                </p>
                <button className="cookie-btn" id="acceptCookie" onClick={() => {setVisible(false); localStorage.setItem('cookie', 'accepted')}}>Принять</button>
            </div>}
        </div>
    );
};

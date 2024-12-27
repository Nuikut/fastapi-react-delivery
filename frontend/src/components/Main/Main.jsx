import { useEffect, useState } from 'react';
import { getRestaurants } from "../../api/restaurants";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import './Main.css';
import Menu from "../Menu";

export default function RestaurantPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cartLength, setCartLength] = useState(0);
    const [restaurants, setRestaurants] = useState([]);
    const [visible, setVisible] = useState(false);

    function getUserRestaurant() {
        return localStorage.getItem("userRestaurant") || null;
    }

    useEffect(() => {
        async function fetchRestaurants() {
            try {
                const data = await getRestaurants();
                setRestaurants(data['restaurants']);
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

    const [hoveredRestaurant, setHoveredRestaurant] = useState(null);

    const handleMouseEnter = (restaurant) => {
        setHoveredRestaurant(restaurant);
    };

    const handleMouseLeave = () => {
        setHoveredRestaurant(null);
    };

    const RestaurantList = () => {
        const selectRestaurant = (restaurantAddress) => {
            localStorage.setItem("userRestaurant", restaurantAddress);
            toggleMenu();
        };

        return (
            <div className='restaurantListContainer'>
                <h2>Наши места:</h2>
                <ul className="restaurantListItem">
                    {restaurants && restaurants.map((restaurant) => (
                        <div className="restaurantListItem" key={restaurant.address}>
                            <li
                                className='restaurantAddress'
                                onClick={() => selectRestaurant(restaurant.name)}
                                onMouseEnter={() => handleMouseEnter(restaurant)}
                                onMouseLeave={handleMouseLeave}
                            >
                                {restaurant.name} {restaurant.address}
                            </li>
                            <li className='restaurantCuisine' style={{ textAlign: 'right' }}> {restaurant.category}</li>

                            {/* Всплывающее окно с полным адресом при наведении */}
                            {hoveredRestaurant === restaurant && (
                                <div className="tooltip">
                                    <p>{restaurant.name}</p>
                                    <p>{restaurant.address}</p>
                                    <p>{restaurant.category}</p>
                                </div>
                            )}
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
                    <button onClick={toggleMenu}>{getUserRestaurant() || "Выберите ресторан"}</button>
                    <div className="cart">
                        <Link to="/cart">
                            <img src="/cart.svg" alt="Корзина"/>
                            <span>{cartLength}</span>
                        </Link>
                    </div>
                </div>
            </Header>
            <div>
                {isMenuOpen && <RestaurantList />}
            </div>
            <Menu onSendData={handleCartUpdate}></Menu>

            {!getUserRestaurant() && !isMenuOpen &&
                <div className="restaurantButton" style={{ alignItems: 'center', justifyContent: "center", height: "70vh", display: "flex", flexDirection: "column" }}>
                    <p style={{ fontFamily: "Arial sans-serif", fontSize: 32 }}>Мы уже готовы доставить Вашу еду, осталось совсем чуть-чуть🤏</p>
                    <button style={{ height: "70px" }} onClick={toggleMenu}>{"Выберите ресторан"}</button>
                </div>
            }

            {visible &&
                <div className="cookie-banner">
                    <p>
                        Мы используем файлы cookie для улучшения работы сайта. Продолжая пользоваться сайтом, вы
                        соглашаетесь с нашей
                        <a href="/cookie-policy" target="_blank">политикой использования cookie</a>.
                    </p>
                    <button className="cookie-btn" id="acceptCookie" onClick={() => {
                        setVisible(false);
                        localStorage.setItem('cookie', 'accepted')
                    }}>Принять
                    </button>
                </div>
            }
        </div>
    );
}

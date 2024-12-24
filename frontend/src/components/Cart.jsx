import {useEffect, useState} from "react";
import Header from "./Header/Header";
import MenuCard from "./MenuCard";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {getRandomStaff, placeOrder} from "../api/cart";
import {jwtDecode} from 'jwt-decode'
import {useNavigate} from "react-router-dom";

export default function Cart() {
    const storedCart = localStorage.getItem("cart");
    const [cart, setCart] = useState(storedCart ? JSON.parse(storedCart) : []);
    const [totalPrice, setTotalPrice] = useState(0);
    const [orderedCart, setOrderedCart] = useState([]);
    const navigate = useNavigate();

    const deleteFromCart = (meal) => {
        const updatedCart = [...cart];
        const existingItem = updatedCart.find(
            (item) => item.name === meal.name && item.price === meal.price
        );

        if (existingItem) existingItem.quantity -= 1;

        if (existingItem.quantity === 0) {
            const index = updatedCart.indexOf(existingItem);
            updatedCart.splice(index, 1);
        }

        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const mapCart = () => {
        return (
            <div className="MappedCart">
                {Object.entries(orderedCart).map(([restaurant, meals]) => (
                    <div key={restaurant}>
                        <h2 style={{marginLeft: "20px"}}>Блюда из ресторана {restaurant}</h2>
                        <ul className="restaurant" style={{display: "flex", flexDirection: "row"}}>
                            {meals.map((meal) => (
                                <div key={`${meal.name}-${meal.price}`}>
                                    <MenuCard meal={meal} func={deleteFromCart} action="-"/>
                                    <p className="quantity" style={{fontSize: "20px", textAlign: "center"}}>
                                        x {meal.quantity}
                                    </p>
                                </div>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        );
    };

    const order = async () => {
        for (const [restaurant, meals] of Object.entries(orderedCart)) {
            const cart = meals.map((item) => ({
                name: item.name,
                quantity: item.quantity,
            }))
            const staff = await getRandomStaff(restaurant);
            const token = localStorage.getItem("access_token")
            if (!token || token.length < 5) {
                navigate("/login");
                return;
            }

            const username = jwtDecode(token).sub

            const result = await placeOrder(
                totalPrice,
                username,
                staff['staff'][0].login,
                restaurant,
                cart
            );
            if (result['status'] === 'Success') {
                toast.success(`Заказ в ресторане ${restaurant} успешно оформлен!`,{
                    autoClose: 3000,
                    position: "bottom-left",
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                });
                setCart([]);
                localStorage.setItem("cart", "")
            }
        }
    };

    useEffect(() => {
        const groupedCart = cart.reduce((acc, item) => {
            if (!acc[item.restaurant]) acc[item.restaurant] = [];
            acc[item.restaurant].push(item);
            return acc;
        }, {});

        setOrderedCart(groupedCart);

        const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(total);
    }, [cart]);

    return (
        <div className="Cart" style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
            <Header/>
            <div className="menu" style={{flexGrow: 1}}>{mapCart()}</div>
            <ToastContainer />
            <footer
                style={{
                    marginTop: "auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    marginRight: "50px",
                    marginBottom: "20px",
                }}
            >
                <p
                    className="totalPrice"
                    style={{fontWeight: "bold", fontSize: "20px", marginLeft: "40px"}}
                >
                    Общая сумма заказа: {totalPrice} ₽
                </p>
                <div className="restaurantButton">
                    <button style={{marginBottom: "10px"}} onClick={order}>
                        Оплатить
                    </button>
                </div>
            </footer>
        </div>
    );
}

import {useEffect, useState} from "react";

export default function Cart() {
    const storedCart = localStorage.getItem('cart');
    const [cart, setCart] = useState(storedCart ? JSON.parse(storedCart) : []);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const countTotalPrice = () => {
            const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
            setTotalPrice(total);
        };

        countTotalPrice();
    }, [cart]);

    return (
        <div className="Cart">
            <ul className="CartItems">
                {cart.map((meal) => (
                    <li className='meal' key={meal.name}>
                        <li className='mealName'> {meal.name}<br/></li>
                        <li className='mealPrice'> {meal.price}<br/></li>
                        <li className='mealAvailable'> {meal.restaurant}<br/></li>
                        <li className='mealAvailable'> {meal.quantity}<br/></li>
                    </li>
                ))}
                <p>Total: {totalPrice}</p>
            </ul>
        </div>
    )
}
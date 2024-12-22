export default function Cart() {
    const cart = localStorage.getItem("cart")

    return (
        <div className="Cart">
            <ul className="CartItems">
                {cart.map((meal) => (
                    <li className='meal' key={meal.name}>
                        <li className='mealName'> {meal.name}<br/></li>
                        <li className='mealPrice'> {meal.price}<br/></li>
                        <li className='mealAvailable'> {meal.available}<br/></li>
                    </li>
                ))}
        </ul>
</div>
)
}
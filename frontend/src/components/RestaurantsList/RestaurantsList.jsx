import './RestaurantsLists.css';

export default function RestaurantsList({restaurants}) {
    return (
        <div className='restaurantsList'>
            <p>Список ресторанов</p>
            <ul className="restaurantsList">
                {restaurants.map((restaurant) => (
                    <li className="restaurantsListItem">
                        <li className='restaurantsCuisine'> {restaurant.category}</li>
                        <li className='restaurantsAddress'> {restaurant.address}<br/></li>
                        <button className='adminButton'>Активен</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
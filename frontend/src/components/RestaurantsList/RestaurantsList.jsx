import './RestaurantsLists.css';
import {deleteRestaurant} from "../../api/admin";
import {useEffect, useState} from "react";
import {getRestaurants} from "../../api/restaurants";

export default function RestaurantsList() {
    const [restaurants, setRestaurants] = useState([]);
    useEffect(() => {
        async function loadRestaurants() {
            const result = await getRestaurants()
            setRestaurants(result)
        }
        loadRestaurants();
    }, [])


    const removeRestaurant = async (address) => {
         if (await deleteRestaurant(address) === "Foreign key violation")
             console.log(address) //TODO:popup
        else
            setRestaurants(prevRestaurants => prevRestaurants.filter(restaurant => restaurant.address !== address));
    }

    return (
        <div className='restaurantsList'>
            <p>Список ресторанов</p>
            <ul className="restaurantsList">
                {restaurants.map((restaurant) => (
                    <li className="restaurantsListItem">
                        <li className='restaurantsCuisine'> {restaurant.category}</li>
                        <li className='restaurantsAddress'> {restaurant.address}<br/></li>
                        <button className='adminButton' onClick={() => (removeRestaurant(restaurant.address))}>Активен
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
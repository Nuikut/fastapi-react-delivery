import {getMenu} from "../api/restaurants";
import {useEffect, useState} from "react";


export default function Menu({restaurant = '123 Culinary Avenue, Flavor Town, CA 90210'})  {

    const [menu, setMenu] = useState([]);

    const fetchMenu = async (restaurant) => {
            const response = await getMenu(restaurant);
            setMenu(response);
    };

    useEffect(() => {
        fetchMenu(restaurant);
    }, [restaurant]);

    return (
        <div className="menu">
            <h2 className="menu-title">Меню</h2>
            <div className="menu-items">
                {menu.map((item) => (
                    <div className="menu-card">
                        <img src={item.image} alt={item.name} className="menu-card-image" />
                        <div className="menu-card-content">
                            <h3 className="menu-card-title">{item.name}</h3>
                            <p className="menu-card-description">{item.description}</p>
                            <div className="menu-card-footer">
                                <span className="menu-card-price">{item.price}₽</span>
                                <span className="menu-card-price">{item.category}</span>
                                <button className="menu-card-button"></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}
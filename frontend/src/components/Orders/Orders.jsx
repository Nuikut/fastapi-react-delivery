import './Orders.css'
import {useState} from "react";
import {rateOrder} from "../../api/cart";

export default function Orders({orders}) {
    const [rating, setRating] = useState(0);

    const rate = (id) => {
        const response = rateOrder(id, rating)
    }

    if (!orders || orders.length < 1)
        return (
            <div className="Orders">
                <p style={{textAlign: "center", fontSize: "20px"}}>Нет заказов</p>
            </div>
        )
    return (
        <div className="Orders">
            {orders.map((order, index) => (
                <div key={index}>
                    <div style={{marginLeft: "150px", display: "flex", flexDirection: "row"}}>
                        <div style={{width: '70%'}}>
                            <p className="orderAddress"> {order.restaurant}</p>
                            <p className="orderTime">в {order.time}</p>
                            <p className="orderRating">{order.rating}</p>
                        </div>
                        <div style={{width: '10%'}}>
                            <p>Блюда:</p>
                            {order.cart.map((item) => (
                                <p>{item[0]} x{item[1]} </p>
                            ))}
                        </div>
                        {!order.rating &&
                            <div className="restaurantButton" style={{marginLeft: "auto", marginRight: "5px"}}>
                                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                    <input
                                        type="number"
                                        min="1"
                                        max="5"
                                        value={rating}
                                        onChange={(e) => setRating(e.target.value)}
                                        style={{
                                            width: "50px",
                                            marginRight: "10px",
                                            borderRadius: "4px",
                                            border: "1px solid #ddd",
                                            borderBlock: "none",
                                            padding: "5px",
                                        }}
                                    />
                                    <button onClick={() => rate(order.id)}>Оценить</button>
                                </div>
                            </div>
                        }
                    </div>
                    <hr/>
                </div>
            ))}
        </div>
    )
}
export default function MenuCard({meal, func, action}) {
    return (
        <div className="menu-card">
            <img src={meal.image} alt={meal.name} className="menu-card-image"/>
            <div className="menu-card-content">
                <h3 className="menu-card-title">{meal.name}</h3>
                <p className="menu-card-description">{meal.description}</p>
                <div className="menu-card-footer">
                    <span className="menu-card-category">{meal.category}</span>
                    <span className="menu-card-price">{meal.price}₽</span>
                </div>
                <button className="menu-card-button" onClick={() => func(meal)}>{action}</button>
            </div>
        </div>
    )
}
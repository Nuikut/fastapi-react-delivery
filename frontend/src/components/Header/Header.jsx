import './Header.css'
import {Link} from "react-router-dom";


export default function Header({name = "", children}) {
    return (
        <header className="header">
            <Link to="/profile" className="logo">
                <img src="/profile.png" alt={`${name}`}/>
            </Link>
            <nav className="nav">
                <ul>
                    <li>
                        <Link to="/">Главная</Link>
                    </li>
                    <li>
                        <Link to="/menu">Меню</Link>
                    </li>
                    <li>
                        <Link to="/about#about">О нас</Link>
                    </li>
                    <li>
                        <Link to="/about#contact">Контакты</Link>
                    </li>
                </ul>
            </nav>
            <nav className="header-right">
                {children}
            </nav>
            <div className="search">
            </div>
        </header>
    )
}

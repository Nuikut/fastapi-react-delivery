import React, {useEffect} from 'react';
import Header from "../Header/Header";
import './About.css'
import {useLocation} from "react-router-dom";

const AboutUs = () => {
    const location = useLocation();

    useEffect(() => {
        const hash = location.hash;
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({behavior: "smooth"});
            }
        }
    }, [location]);

    return (
        <div>About Us
            <Header></Header>
            <div style={{padding: '20px', fontFamily: 'Arial, sans-serif'}}>
                <section id="about" style={{marginBottom: '40px', textAlign: 'center', marginTop:"60px", scrollMarginTop: '200px'}}>
                    <h1>О нас</h1>
                    <p>
                        Мы — <strong>FastFoodDelivery</strong>, ваш надежный партнер в доставке блюд из лучших
                        ресторанов города. Наша цель — сделать вкусную и свежую еду доступной каждому.
                    </p>
                </section>

                <section style={{marginBottom: '40px'}}>
                    <h2>Наша миссия и ценности</h2>
                    <p>
                        Мы верим, что каждый заслуживает удовольствия от качественной еды. Наша миссия — обеспечить
                        удобство, скорость и непревзойденное качество в каждой доставке. Мы заботимся о:
                    </p>
                    <ul>
                        <li>Качественных ингредиентах</li>
                        <li>Сохранении вкуса и свежести блюд</li>
                        <li>Экологичности упаковки</li>
                    </ul>
                </section>

                <section style={{marginBottom: '40px'}}>
                    <h2>Наша история</h2>
                    <p>
                        FastFoodDelivery был основан в 2024 году с целью объединить рестораны и клиентов в одном удобном
                        сервисе. Мы начинались как простой курсовой проект студента, а сейчас можем гордиться тем, что
                        стали надежным партнером для тысяч людей, доставляя не просто еду, а удовольствие и комфорт в
                        каждый дом.
                    </p>
                </section>

                <section style={{marginBottom: '40px'}}>
                    <h2>Наши партнеры</h2>
                    <p>
                        Мы сотрудничаем с лучшими ресторанами города, включая:
                    </p>
                    <ul>
                        <li>Китайся кухня: ХА ОЧИ</li>
                        <li>Фастфуд: Усы Лисы</li>
                        <li>Европейская кухня: Астория</li>
                    </ul>
                </section>

                <section style={{marginBottom: '40px'}}>
                    <h2>Как это работает?</h2>
                    <p>
                        Все просто:
                    </p>
                    <ol>
                        <li>Выберите блюдо из нашего каталога.</li>
                        <li>Оформите заказ через сайт.</li>
                        <li>Дождитесь курьера, который доставит вашу еду горячей и свежей.</li>
                    </ol>
                </section>

                <section style={{marginBottom: '40px'}}>
                    <h2>Наши достижения</h2>
                    <p>
                        Мы запустились! И никаких 5хх ошибок!
                    </p>
                </section>

                <section id="contact">
                    <h2>Свяжитесь с нами</h2>
                    <p>
                        Телефон: <a href="tel:+123456789">+123 456 789</a><br/>
                        Email: <a href="mailto:support@fastfooddelivery.com">support@fastfooddelivery.com</a><br/>
                        Социальные сети: <a href="#">Facebook</a>, <a href="#">Instagram</a>, <a href="#">Twitter</a>
                    </p>
                </section>
            </div>
        </div>
    );
};

export default AboutUs;

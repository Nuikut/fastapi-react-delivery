import './LoadingScreen.css'

export default function LoadingScreen({child}) {

    return (
        <div className="LoadingScreen">
            <p>{child ? `${child}...` : 'Загружаем данные...'}</p>
            <div className="Spinner">

            </div>
        </div>
    );
}
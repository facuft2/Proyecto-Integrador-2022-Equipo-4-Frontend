import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Arrow } from "../../assets/iconsInUse/repeat.svg";

import './index.scss';

const ExchangeInfo = ({ myProduct, otherProduct, recieved, exchangeId }) => {
    const navigate = useNavigate();

    return (
        <div className="exchange-info">
            <div className="exchange-info__container">
                <div className="exchange-info__object">
                    <span className="exchange-info__object-text">{myProduct.titulo}</span>
                    <img className="exchange-info__object-image" src={myProduct.foto} alt={myProduct.titulo} />
                </div>
                <div className="exchange-info__object-arrow">
                    <Arrow className="exchange-info__object-arrow" />
                </div>
                <div className="exchange-info__object">
                    <span className="exchange-info__object-text">{otherProduct.titulo}</span>
                    <img className="exchange-info__object-image" src={otherProduct.foto} alt={otherProduct.titulo} />
                </div>
            </div>
            <div className="exchange-info__button">
                <button className="exchange-info__button-button" onClick={() => navigate(`/exchangeRequest/${exchangeId}`)}>Ver informacion</button>
                {recieved &&
                    <div className="exchange-info__button-buttons">
                        <button className="exchange-info__button-accept">Aceptar</button>
                        <button className="exchange-info__button-reject">Rechazar</button>
                    </div>
                }
            </div>
        </div>
    );
};

export default ExchangeInfo;
import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Arrow } from "../../assets/iconsInUse/repeat.svg";

import './index.scss';

const ExchangeWindow = ({myProduct, otherProduct, myProfile, otherProfile}) => {
    return (
        <div className="exchange-window">
            <div className="exchange-window__object">
                <span className="exchange-window__object-text">{myProduct?.titulo}</span>
                <img className="exchange-window__object-image" src={myProduct?.foto} alt={myProduct?.titulo} />
                <img className="exchange-window__object-profile-image" alt={myProfile?.nombre} src={myProfile?.foto_perfil} />
            </div>
            <div className="exchange-window__object-arrow">
                <Arrow className="exchange-window__object-arrow" />
            </div>
            <div className="exchange-window__object">
                <span className="exchange-window__object-text">{otherProduct?.titulo}</span>
                <img className="exchange-window__object-image" src={otherProduct?.foto} alt={otherProduct?.titulo} />
                <img className="exchange-window__object-profile-image" alt={otherProfile?.nombre} src={otherProfile?.foto_perfil} />
            </div>
        </div>
    );
};

export default ExchangeWindow;
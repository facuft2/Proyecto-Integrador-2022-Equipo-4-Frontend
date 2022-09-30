import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Arrow } from "../../assets/iconsInUse/repeat.svg";

import './index.scss';

const ExchangeWindow = ({myProduct, otherProduct, myProfile, profile}) => {

    return (
        <div className="exchange-window">
            <div className="exchange-window__object">
                <span className="exchange-window__object-text">{myProduct.title}</span>
                <img className="exchange-window__object-image" src={myProduct.image} alt={myProduct.title} />
                <img className="exchange-window__object-profile-image" src={myProfile.icon} />
            </div>
            <div className="exchange-window__object-arrow">
                <Arrow className="exchange-window__object-arrow" />
            </div>
            <div className="exchange-window__object">
                <span className="exchange-window__object-text">{otherProduct.title}</span>
                <img className="exchange-window__object-image" src={otherProduct.image} alt={otherProduct.title} />
                <img className="exchange-window__object-profile-image" src={profile.icon} />
            </div>
        </div>
    );
};

export default ExchangeWindow;
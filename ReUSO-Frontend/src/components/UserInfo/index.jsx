import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Arrow } from "../../assets/iconsInUse/repeat.svg";

import './index.scss';

const UserInfo = ({ profile }) => {
    const navigate = useNavigate();

    return (
        <div className="user-info">
            <img className="user-info-image" src={profile.icon} alt="" />
            <div className="user-info-texts">
                <span className="user-info-texts-name">{profile.name}</span>
                <span className="user-info-texts-redirect" onClick={() => { navigate('/profile', { replace: true }) }}>Ver perfil</span>
            </div>
            <div className="user-info-stats">
                <div className="user-info-stats-exchange">
                    <span className="user-info-stats-exchange-number">{profile.intercambios}</span>
                </div>
                <div className="user-info-stats-objects">
                    <span className="user-info-stats-objects-number">{profile.objetosDisponibles}</span>
                </div>
                <div className="user-info-stats-likes">
                    <span className="user-info-stats-likes-number">{profile.likes}</span>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;

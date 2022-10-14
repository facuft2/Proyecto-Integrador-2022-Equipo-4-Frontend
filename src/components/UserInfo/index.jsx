import React from "react";
import { useNavigate } from "react-router-dom";

import './index.scss';

const UserInfo = ({profile}) => {
    const navigate = useNavigate();

    return (
        <div className="user-info">
            <img className="user-info-image" src={profile?.foto_perfil} alt="" />
            <div className="user-info-texts">
                <span className="user-info-texts-name">{`${profile?.nombre} ${profile?.apellido}`}</span>
                <span className="user-info-texts-redirect" onClick={() => { navigate(`/profile/${profile?.id}`, { replace: false }) }}>Ver perfil</span>
            </div>
            <div className="user-info-stats">
                <div className="user-info-stats-exchange">
                    <span className="user-info-stats-exchange-number">{profile?.cant_intercambio}</span>
                </div>
                <div className="user-info-stats-objects">
                    <span className="user-info-stats-objects-number">{profile?.producto?.length}</span>
                </div>
                <div className="user-info-stats-likes">
                    <span className="user-info-stats-likes-number">3</span>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;

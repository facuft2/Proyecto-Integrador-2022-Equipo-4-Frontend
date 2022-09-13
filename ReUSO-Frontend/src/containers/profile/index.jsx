import React, { useState } from "react";
import HeaderGen from "../../components/HeaderGen";
import Object from "../../components/Object";
import { fakeUsers } from "../../constants";
import { useNavigate } from "react-router-dom";
import { getUsersById } from "../../api";

import "./index.scss";
import { useEffect } from "react";

const Profile = () => {
  const [profile, setProfile] = useState()
  const navigate = useNavigate();
  const myId = localStorage.getItem("id");
  const isMyProfile = profile?.id === parseInt(myId);

  async function cosito() {
    setProfile(await getUsersById({id: myId}))
  }

  useEffect(( ) => {
    cosito()
  },[]) 

  return (
    <div className="profile">
      <HeaderGen text="Perfil" />
      <div className="profile__body">
        <div className="profile__body-info">
          <img
            className="profile__body-info-image"
            src={fakeUsers[0].icon}
            alt="profile"
          />
          <span className="profile__body-info-name">{`${profile?.nombre} ${profile?.apellido}`}</span>
        </div>
        <div className="profile__body-data">
          <div className="profile__body-data-item">
            <span className="profile__body-data-item-text">intercambios</span>
            <span>{profile?.cant_intercambio}</span>
          </div>
          <div className="profile__body-data-item--small">
            <span className="profile__body-data-item-text">likes</span>
            <span>3</span>
          </div>
          <div className="profile__body-data-item--expand">
            <span className="profile__body-data-item-text">
              objetos disponibles
            </span>
            <span>{profile?.producto?.length}</span>
          </div>
        </div>
        {isMyProfile && (
          <div className="profile-edit">
            <button className="profile-edit-button" onClick={() => navigate('/profile/edit')}>Editar perfil</button>
          </div>
        )}
        <div className="profile__card">
          <span className="profile__card-exchange">
            Objetos para intercambiar
          </span>
          <div className="profile__card-box">
            {profile?.producto?.map(({titulo, tipo_trato, id, foto}) => (
              <Object
                foto={foto}
                id={id}
                title={titulo}
                trueque={tipo_trato === "INTERCAMBIO" ? true : false}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import React from "react";
import HeaderGen from "../../components/HeaderGen";
import Object from "../../components/Object";
import { fakeUsers } from "../../constants";
import { useNavigate } from "react-router-dom";

import "./index.scss";

const Profile = () => {
  const navigate = useNavigate();
  console.log(fakeUsers[0].productos);
  const myId = localStorage.getItem("id");
  const isMyProfile = fakeUsers[0].id === parseInt(myId);

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
          <span className="profile__body-info-name">{fakeUsers[0].name}</span>
        </div>
        <div className="profile__body-data">
          <div className="profile__body-data-item">
            <span className="profile__body-data-item-text">intercambios</span>
            <span>{fakeUsers[0].intercambios}</span>
          </div>
          <div className="profile__body-data-item--small">
            <span className="profile__body-data-item-text">likes</span>
            <span>{fakeUsers[0].likes}</span>
          </div>
          <div className="profile__body-data-item--expand">
            <span className="profile__body-data-item-text">
              objetos disponibles
            </span>
            <span>{fakeUsers[0].objetosDisponibles}</span>
          </div>
        </div>
        {isMyProfile && (
          <div className="profile-edit">
            <button className="profile-edit-button" onClick={() => navigate('/profile/edit')}>Editar perfil</button>
          </div>
        )}
        <div className="profile__card">
          <span className="profile__card-exchange">
            {" "}
            Objetos para intercambiar{" "}
          </span>
          <div className="profile__card-box">
            {fakeUsers[0].productos.map((card) => (
              <Object
                image={card.image}
                id={card.id}
                title={card.title}
                trueque={card.trueque}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fakeUsers } from "../../constants";
import HeaderGen from "../../components/HeaderGen";

import './index.scss';

const EditProfile = () => {
  const navigate = useNavigate();
  const info = fakeUsers[0];

  return (
    <div className="edit-profile">
      <HeaderGen text="Editar perfil" />
      <div className="edit-profile__body">
        <div className="edit-profile__body-photo">
          <img className="edit-profile__body-photo-image" src={info.icon}></img>
        </div>
        <div className="edit-profile__body-data">
          <span className="edit-profile__body-data-name">{info.name}</span>
          <span className="edit-profile__body-data-email">{info.email}</span>
        </div>
      </div>
    </div>
  )
}

export default EditProfile;

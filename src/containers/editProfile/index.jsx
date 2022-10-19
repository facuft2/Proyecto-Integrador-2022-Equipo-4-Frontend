import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsersById } from "../../api";
import { ReactComponent as Camera } from '../../assets/iconsInUse/camera.svg';
import HeaderGen from "../../components/HeaderGen";

import './index.scss';

const EditProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState();
  const [image, setImage] = useState();
  const id = localStorage.getItem("userId")

  useEffect(() => {
    Promise.all(
      getUsersById({ id })
        .then((data) => setProfile(data))
    )
  }, [])


  return (
    <div className="edit-profile">
      <HeaderGen text="Editar perfil" />
      <div className="edit-profile__body">
        <div className="edit-profile__body-photo-box">
          <div className="edit-profile__body-photo">
            <img className="edit-profile__body-photo-image" alt="foto de perfil" src={profile?.foto_perfil} />
            <label className="add-item__image-edit" for="upload">
              <Camera className="edit-profile__body-photo-image-camera" />
            </label>
            <div className="add-item__image-edit-button">
              <input
                type="file"
                id="upload"
                accept="image/*"
                onChange={(e) => {
                  setImage(e.target.files[0])
                }}
              />
            </div>
          </div>
        </div>
        <div className="edit-profile__body-data">
          <span className="edit-profile__body-data-name">{`${profile?.nombre} ${profile?.apellido}`}</span>
          <span className="edit-profile__body-data-email">{profile?.email}</span>
        </div>
        <div className="edit-profile__body-inputs-container">
          <div className="edit-profile__body-inputs-container-box">
            <span>Nombre:</span>
            <textarea type="text" className="edit-profile__body-inputs-container-box-input" value={profile?.nombre}/>
          </div>
          <div className="edit-profile__body-inputs-container-box">
            <span>Email:</span>
            <textarea type="text" className="edit-profile__body-inputs-container-box-input" value={profile?.email}/>
          </div>
          <div className="edit-profile__body-inputs-container-box">
            <span>Descripcion:</span>
            <textarea type="text" className="edit-profile__body-inputs-container-box-input" value={profile?.descripcion} />
          </div>
        </div>
        <div className="edit-profile__body-button">
          <button className="edit-profile__body-button--cancel" onClick={() => navigate('/', { replace: true })}>Cancelar</button>
          <button className="edit-profile__body-button--success" >Guardar</button>
        </div>
      </div>
    </div>
  )
}

export default EditProfile;

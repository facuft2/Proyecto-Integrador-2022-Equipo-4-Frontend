import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getMyProfile, editMyProfile, postUserImages } from "../../api";
import { ReactComponent as Camera } from '../../assets/iconsInUse/camera.svg';
import HeaderGen from "../../components/HeaderGen";

import './index.scss';

const EditProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState();
  const [foto_perfil, setFoto_perfil] = useState();
  const [foto_perfil_preview, setFoto_perfil_preview] = useState();
  const [nombre, setNombre] = useState();
  const [apellido, setApellido] = useState();
  const [email, setEmail] = useState();
  const [descripcion, setDescripcion] = useState();

  useEffect(() => {
    Promise.all(
      getMyProfile()
        .then((data) => {
          setProfile(data);
          setNombre(data.nombre);
          setApellido(data.apellido);
          setEmail(data.email);
          setDescripcion(data.descripcion);
        })
    )
  }, []);

  useEffect(() => {
    if (foto_perfil) {
      setFoto_perfil_preview(URL.createObjectURL(foto_perfil));
    }
  }, [foto_perfil]);

  const handleSubmit = () => {
    if (foto_perfil) {
      const formData = new FormData();
      formData.append('foto_perfil', foto_perfil);

      postUserImages({ foto: formData.get('foto_perfil') })
        .then((data) => {
          toast.promise(
            editMyProfile({
              nombre,
              apellido,
              email,
              descripcion,
              foto_perfil: data,
            }),
            {
              loading: 'Editando perfil',
              success: 'Su perfil fue editado correctamente',
              error: 'Error al editar su perfil',
            }
          ).then(() => {
            navigate('/', { replace: false });
          })
        })
        .catch(() => {
          toast.error('La imagen no se pudo editar')
        })
    } else {
      toast.promise(editMyProfile({ nombre, apellido, email, descripcion }), {
        loading: 'Editando perfil',
        success: 'Su perfil fue editado correctamente',
        error: 'Error al editar su perfil',
      }).then(() => {
        navigate('/', { replace: false });
      });
    }
  }

  return (
    <div className="edit-profile">
      <HeaderGen text="Editar perfil" />
      <div className="edit-profile__body">
        <div className="edit-profile__body-photo-box">
          <div className="edit-profile__body-photo">
            <img className="edit-profile__body-photo-image" alt="foto de perfil" src={foto_perfil_preview || profile?.foto_perfil} />
            <label className="add-item__image-edit" for="upload">
              <Camera className="edit-profile__body-photo-image-camera" />
            </label>
            <div className="add-item__image-edit-button">
              <input
                type="file"
                id="upload"
                accept="image/*"
                onChange={(e) => {
                  setFoto_perfil(e.target.files[0])
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
            <textarea type="text" className="edit-profile__body-inputs-container-box-input" onChange={(e) => setNombre(e.target.value)} value={nombre} />
          </div>
          <div className="edit-profile__body-inputs-container-box">
            <span>apellido:</span>
            <textarea type="text" className="edit-profile__body-inputs-container-box-input" onChange={(e) => setApellido(e.target.value)} value={apellido} />
          </div>
          <div className="edit-profile__body-inputs-container-box">
            <span>Email:</span>
            <textarea type="text" className="edit-profile__body-inputs-container-box-input" onChange={(e) => setEmail(e.target.value)} value={email} />
          </div>
          <div className="edit-profile__body-inputs-container-box">
            <span>Descripcion:</span>
            <textarea type="text" className="edit-profile__body-inputs-container-box-input" onChange={(e) => setDescripcion(e.target.value)} value={descripcion} />
          </div>
        </div>
        <div className="edit-profile__body-button">
          <button className="edit-profile__body-button--cancel" onClick={() => navigate('/', { replace: true })}>Cancelar</button>
          <button className="edit-profile__body-button--success" onClick={handleSubmit}>Guardar</button>
        </div>
      </div>
    </div>
  )
}

export default EditProfile;

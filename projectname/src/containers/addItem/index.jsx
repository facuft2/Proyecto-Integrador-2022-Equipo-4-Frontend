import React, { useState } from "react";
import HeaderGen from "../../components/HeaderGen";
import { fakeUsers } from "../../constants";
import Object from "../../components/Object";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./index.scss";
import { useEffect } from "react";

const AddItem = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState();
  const [showImage, setShowImage] = useState();

  useEffect(() => {
    setShowImage(image ? URL.createObjectURL(image) : null);
    console.log(showImage)
  }, [image]);

  return (
    <div className="add-item">
      <HeaderGen text="Agregar un producto" />
      <div className="add-item__profile">
        <img
          className="add-item__profile-image"
          src={fakeUsers[0].icon}
          alt="profile"
        />
        <span className="add-item__profile-name">{fakeUsers[0].name}</span>
      </div>
      <div className="add-item__image-mother">
        <span className="add-item__image-text">Foto del producto</span>
        <div className="add-item__image-box">
          {!image ? (
            <>
              <label className="add-item__image-upload" for="upload">
                Subir foto...
              </label>
              <input
                type="file"
                id="upload"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </>
          ) : (
            <>
              <img className="add-item__image" src={showImage} alt="product" />
            </>
          )}
        </div>
        <div className="add-item__image-edit-container">
          {image && (
            <>
              <label className="add-item__image-edit" for="upload">
                Editar foto...
              </label>
              <div className="add-item__image-edit-button">
                <input
                  type="file"
                  id="upload"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <div className="add-item__name">
        <span className="add-item__name-text">Nombre del producto</span>
        <textarea type="text" className="add-item__name-input" />
      </div>
      <div className="add-item__description">
        <span className="add-item__description-text">
          Descripcion del producto
        </span>
        <textarea type="text" className="add-item__description-input" />
      </div>
      <div className="add-item__amount">
        <span className="add-item__amount-text">Cantidad</span>
        <input type="number" className="add-item__amount-input" />
      </div>
      <div className="add-item__type">
        <span className="add-item__type-text">Tipo de trueque</span>
        <select className="add-item__type-input">
          <option value="trueque">trueque</option>
          <option value="intercambio">intercambio</option>
        </select>
      </div>
      <div className="add-item__button">
        <button className="add-item__button--cancel" onClick={() => navigate('/', { replace: true })}>Cancelar</button>
        <button className="add-item__button--add" onClick={() => {
          const options = {
            method: 'POST',
            url: 'http://localhost:4000/users',
            headers: {'Content-Type': 'application/json'},
            data: {
              nombre: 'Juan',
              apellido: 'Perez',
              email: 'Juan@example.com',
              contrasenia: '12345',
              descripcion: 'Usuario de prueba',
              foto_perfil: showImage,
              telefono: '12345678',
              producto: {titulo: 'hola', descripcion: 'hola', tipo_trato: 'INTERCAMBIO', foto: showImage, cantidad: 1}
            }
          };
          
          axios.request(options).then(function (response) {
            console.log(response.data);
          }).catch(function (error) {
            console.error(error);
          });
        }}>Agregar producto</button>
      </div>
    </div>
  );
};

export default AddItem;

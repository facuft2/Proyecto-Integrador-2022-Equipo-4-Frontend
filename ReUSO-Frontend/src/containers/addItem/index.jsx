import React, { useState } from "react";
import HeaderGen from "../../components/HeaderGen";
import { fakeUsers } from "../../constants";
import { postProducts } from "../../api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./index.scss";
import { useEffect } from "react";

const AddItem = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(false);
  const [showImage, setShowImage] = useState();
  const [titulo, setTitulo] = useState()
  const [descripcion, setDescripcion] = useState();
  const [cantidad, setCantidad] = useState();
  const [tipo_trato, setTipoTrato] = useState("INTERCAMBIO");
  const reader = new FileReader();
  reader.onloadend = () => {
    setShowImage(reader.result)
  }
  
  const createProduct = () => {
    postProducts({titulo, descripcion, tipo_trato, cantidad, foto: showImage}).then(
      navigate('/', { replace: false })
    )
  }

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
                onChange={(e) => { 
                  reader.readAsDataURL(e.target.files[0])
                  setImage(true)
                }
              }
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
                  onChange={(e) => {
                    reader.readAsDataURL(e.target.files[0])
                    setImage(true)
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <div className="add-item__name">
        <span className="add-item__name-text">Nombre del producto</span>
        <textarea onChange={(e) => setTitulo(e.target.value) } type="text" className="add-item__name-input" />
      </div>
      <div className="add-item__description">
        <span className="add-item__description-text">
          Descripcion del producto
        </span>
        <textarea onChange={(e) => setDescripcion(e.target.value)} type="text" className="add-item__description-input" />
      </div>
      <div className="add-item__amount">
        <span className="add-item__amount-text">Cantidad</span>
        <input type="number" onChange={(e) => setCantidad(parseInt(e.target.value, 10))} className="add-item__amount-input" />
      </div>
      <div className="add-item__type">
        <span className="add-item__type-text">Tipo de trueque</span>
        <select className="add-item__type-input" onChange={(e) => setTipoTrato(e.target.value)}>
          <option value="INTERCAMBIO">intercambio</option>
          <option value="DONACION">donacion</option>
        </select>
      </div>
      <div className="add-item__button">
        <button className="add-item__button--cancel" onClick={() => navigate('/', { replace: true })}>Cancelar</button>
        <button className="add-item__button--add" onClick={createProduct}>Agregar producto</button>
      </div>
    </div>
  );
};

export default AddItem;

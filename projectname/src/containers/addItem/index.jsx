import React, { useState } from "react";
import HeaderGen from "../../components/HeaderGen";
import { fakeUsers } from "../../constants";
import Object from "../../components/Object";
import { useNavigate } from "react-router-dom";

import "./index.scss";
import { useEffect } from "react";

const AddItem = () => {
  const [image, setImage] = useState();
  const [mira, setMira] = useState();

  useEffect(() => {
    // setMira()
    setMira(image ? URL.createObjectURL(image) : null);
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
              <img className="add-item__image" src={mira} alt="product" />
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
        <button className="add-item__button--cancel">Cancelar</button>
        <button className="add-item__button--add">Agregar producto</button>
      </div>
    </div>
  );
};

export default AddItem;

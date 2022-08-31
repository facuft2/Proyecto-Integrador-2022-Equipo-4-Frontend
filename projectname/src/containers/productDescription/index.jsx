import React, { useState, useEffect } from "react";
import HeaderGen from "../../components/HeaderGen";
import { productWithUser } from "../../constants";
import { ReactComponent as Arrow } from "../../assets/iconsInUse/repeat.svg";
import "./index.scss";

const Exchange1 = () => {
  const [product, setProduct] = useState();

  return (
    <div className="exchange">
      <HeaderGen text={"¿Que puedes dar?"} />
      <div className="exchange__body">
        <div className="exchange__body-info">
          <div>
            <img
              className="exchange__body-info-image"
              src={productWithUser.userInfo.icon}
              alt="profile"
            />
          </div>
          <span className="exchange__body-info-name">
            {productWithUser.userInfo.name}
          </span>
        </div>
        <span className="product__body-data-title">
          {productWithUser.title}
        </span>
        <img
          className="product__body-data-image"
          src={productWithUser.image}
          alt="product"
        />
      </div>
      <div className="exchange__arrow-box">
        <Arrow className="exchange__arrow-box-arrow" />
      </div>
      <div className="exchange__my-item-box">
        {!product ? (
          <>
            <span className="exchange__my-item-text">
              Seleccione un objeto de inventario.
            </span>
            <button className="exchange__my-item-button">Seleccionar...</button>
          </>
        ) : (
          <img
            className="product__body-data-image"
            src={productWithUser.image}
            alt="product"
          />
        )}
      </div>
      <div className="exchange-button-box">
        {product ? (
          <>
            <button className="exchange-button-display--cancel">
              Cancelar
            </button>
            <button className="exchange-button-display--confirm">
              Confirmar
            </button>
          </>
        ) : (
          <button className="exchange-button--cancel">Cancelar</button>
        )}
      </div>
    </div>
  );
};

export default Exchange1;

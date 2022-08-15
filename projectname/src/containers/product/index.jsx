import React from "react";
import HeaderGen from "../../components/HeaderGen";
import { productWithUser } from "../../constants";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const Product = () => {
  const navigate = useNavigate();
  return (
    <div className="product">
      <HeaderGen text={productWithUser.title} />
      <div className="product__body">
        <div className="product__body-info">
          <img
            className="product__body-info-image"
            src={productWithUser.userInfo.icon}
            alt="profile"
          />
          <span className="product__body-info-name">
            {productWithUser.userInfo.name}
          </span>
        </div>
        <div className="product__body-data">
          <span className="product__body-data-title">
            {productWithUser.title}
          </span>
          <img
            className="product__body-data-image"
            src={productWithUser.image}
            alt="product"
          />
          <div className="product__body-data-description">
            <span className="product__body-data-description-tag">
              Descripcion:
            </span>
            <span className="product__body-data-description-info">
              {productWithUser.description}
            </span>
          </div>
          <span className="product__body-data-description-zona">
            Zona: {productWithUser.zona}
          </span>
          <span className="product__body-data-description-tipo">
            Tipo: {productWithUser.trueque ? "Trueque" : "Donacion"}
          </span>
          <span className="product__body-data-description-cantidad">
            Cantidad: {productWithUser.cantidad}
          </span>
        </div>
      </div>
      <div className="product-button-box">
          <button className="product-button" onClick={() => {navigate('/exchange')}}>¡Estoy interesado!</button>
        </div>
    </div>
  );
};

export default Product;

import React, { useState } from "react";
import HeaderGen from "../../components/HeaderGen";
import { productWithUser } from "../../constants";
import { useParams, useNavigate } from "react-router-dom";
import { getProductsbyId } from "../../api";
import "./index.scss";
import { useEffect } from "react";

const Product = () => {
  const navigate = useNavigate();
  const params = useParams()
  const [product, setProduct] = useState();
  const userId = parseInt(localStorage.getItem('userId'), 10)

  useEffect(() => {
    const fetch = async () => {
      const { product } = await getProductsbyId({ id: params.id })
      setProduct(product)
    }
    fetch()
  }, [])

  return (
    <div className="product">
      {product && (
        <>
          <HeaderGen text={product.titulo} />
          <div className="product__body">
            <div className="product__body-data">
              <div className="product__body-info">
                <img
                  className="product__body-info-image"
                  src={product.usuario.foto_perfil}
                  alt="profile"
                />
                <span className="product__body-info-name">
                  {product.usuario.nombre}
                </span>
              </div>
              <span className="product__body-data-title">
                {product.titulo}
              </span>
              <img
                className="product__body-data-image"
                src={product.foto}
                alt="product"
              />
              <div className="product__body-data-description">
                <span className="product__body-data-description-tag">
                  Descripcion:
                </span>
                <span className="product__body-data-description-info">
                  {product.descripcion}
                </span>
              </div>
              {product.localidad &&
                <span className="product__body-data-description-zona">
                  Zona: {product.localidad}
                </span>
              }
              <span className="product__body-data-description-tipo">
                Tipo: {product.tipo_trato === "INTERCAMBIO" ? "Intercambio" : "Donacion"}
              </span>
              <span className="product__body-data-description-cantidad">
                Cantidad: {product.cantidad}
              </span>
            </div>
          {
            userId !== product.userId ?
              <div className="product-button-box">
                <button className="product-button" onClick={() => { navigate(`/exchange/${params.id}`) }}>¡Estoy interesado!</button>
              </div> :
              <div className="product-button-box">
                <button className="product-button" onClick={() => { navigate(`/exchange/${params.id}`) }}>Editar mi producto</button>
              </div>
          }
          </div>
        </>
      )}
    </div>
  );
};

export default Product;

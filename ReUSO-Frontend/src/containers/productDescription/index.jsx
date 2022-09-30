import React, { useState, useEffect } from "react";
import HeaderGen from "../../components/HeaderGen";
import { InventoryModal } from "../../components/InventoryModal";
import { productWithUser } from "../../constants";
import { ReactComponent as Arrow } from "../../assets/iconsInUse/repeat.svg";
import { useParams } from "react-router-dom";
import { getProductsbyId } from "../../api";

import "./index.scss";

const Exchange1 = () => {
  const [product, setProduct] = useState();
  const [productToExchange, setProductToExchange] = useState();
  const [modal, setModal] = useState(false);
  const params = useParams()

  useEffect(() => {
    const fetch = async () => {
      const { product } = await getProductsbyId({ id: params.id })
      setProductToExchange(product)
    }
    fetch()
  }, [])

  useEffect(() => {
    setModal(false)
  }, [product])

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
          {productToExchange?.titulo}
        </span>
        <img
          className="product__body-data-image"
          src={productToExchange?.foto}
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
            <button onClick={() => setModal(true)} className="exchange__my-item-button">Seleccionar...</button>
          </>
        ) : (
          <img
            className="product__body-data-image"
            src={product.foto}
            alt="product"
          />
        )}
      </div>
      {product && <span className="exchange__my-item-edit" onClick={() => setModal(true)}>Editar producto</span>}
      {modal && <InventoryModal setProduct={setProduct} setModal={setModal}/>}
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

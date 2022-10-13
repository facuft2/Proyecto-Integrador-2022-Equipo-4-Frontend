import React, { useState, useEffect } from "react";
import HeaderGen from "../../components/HeaderGen";
import { InventoryModal } from "../../components/InventoryModal";
// import { productWithUser } from "../../constants";
import { ReactComponent as Arrow } from "../../assets/iconsInUse/repeat.svg";
import { useParams, useNavigate } from "react-router-dom";
import { getProductsbyId } from "../../api";

import "./index.scss";

const Exchange1 = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState();
  const [productToExchange, setProductToExchange] = useState();
  const [modal, setModal] = useState(false);
  const params = useParams()

  const submitExchange = () => {
    localStorage.setItem('myItemToExchange', product?.id)
    localStorage.setItem('itemToRecieve', params.id)
    navigate('/visualizeExchange')
  }

  const fetch = async () => {
    const { product } = await getProductsbyId({ id: params.id })
    setProductToExchange(product)
  }

  useEffect(() => {
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
              src={productToExchange?.usuario?.foto_perfil}
              alt="profile"
            />
          </div>
          <span className="exchange__body-info-name">
            {productToExchange?.usuario?.nombre}
          </span>
        </div>
        <span className="exchange__body-data-title">
          {productToExchange?.titulo}
        </span>
        <img
          className="exchange__body-data-image"
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
              Seleccione un objeto del inventario.
            </span>
            <button onClick={() => setModal(true)} className="exchange__my-item-button">Seleccionar...</button>
          </>
        ) : (
          <>
            <span className="exchange__my-item-data-title">
              {product?.titulo}
            </span>
            <img
              className="exchange__body-data-image"
              src={product.foto}
              alt="product"
            />
          </>
        )}
      </div>
      {product && <span className="exchange__my-item-edit" onClick={() => setModal(true)}>Elegir otro producto</span>}
      {modal && <InventoryModal setProduct={setProduct} setModal={setModal} />}
      <div className="exchange-button-box">
        {product ? (
          <>
            <button className="exchange-button-display--cancel">
              Cancelar
            </button>
            <button className="exchange-button-display--confirm" onClick={submitExchange}>
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

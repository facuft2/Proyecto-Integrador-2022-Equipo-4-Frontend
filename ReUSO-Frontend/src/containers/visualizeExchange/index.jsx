import React, { useState, useEffect } from "react";
import HeaderGen from "../../components/HeaderGen";
import { exchangeInfo } from "../../constants";
import { getProductsbyId, getUsersById, postExchange } from "../../api";
import ExchangeWindow from "../../components/Exchange";
import UserInfo from "../../components/UserInfo";
import { useNavigate } from "react-router-dom";

import "./index.scss";
import { element } from "prop-types";

const VisualizeExchange = () => {
  const info = exchangeInfo[1];
  const [color, setColor] = useState("");
  const [button, setButton] = useState("");
  const [myProduct, setMyProduct] = useState()
  const [otherProduct, setOtherProduct] = useState()
  const [user, setUser] = useState();
  
  const fetch = async () => {
    const fetchMyProduct = await getProductsbyId({ id: localStorage.getItem('myItemToExchange') });
    const fetchOtherProduct = await getProductsbyId({ id: localStorage.getItem('itemToRecieve') });
    const fetchUser = await getUsersById({id: fetchOtherProduct.product.userId})
    setUser(fetchUser)
    setMyProduct(fetchMyProduct);
    setOtherProduct(fetchOtherProduct);
  }

  const createExchange = async () => {
    const exchange = await postExchange({idO: myProduct?.product?.id, idR: otherProduct?.product?.id})
    return exchange
  }
  
  useEffect(() => {
    fetch()
  }, [])


  return (
    <div className="visualize-exchange">
      <HeaderGen text="Visualizar intercambio" />
      <div className="visualize-exchange__body">
        <ExchangeWindow myProduct={myProduct?.product} otherProduct={otherProduct?.product} myProfile={myProduct?.product?.usuario} otherProfile={otherProduct?.product?.usuario} />
        <div className="visualize-exchange__body-description">
          <span className="visualize-exchange__body-description-text">Descripcion del otro producto</span>
          <span className="visualize-exchange__body-description-info">{otherProduct?.product?.descripcion}</span>
        </div>
        <div className="visualize-exchange__body-user">
          <span className="visualize-exchange__body-user-text">¿Con quien intercambias?</span>
          <UserInfo profile={user} />
        </div>
        <div className="visualize-exchange__body-message-box">
          <span className="visualize-exchange__body-message-text">Enviale un mensaje!</span>
          <textarea className="visualize-exchange__body-message" placeholder="¡Hola!, estoy interesado en este producto" />
        </div>
        <div className="visualize-exchange__body-bottom">
          <button className="visualize-exchange__body-bottom-button--cancel">Cancelar</button>
          <button style={{  }} className="visualize-exchange__body-bottom-button--accepted" onClick={createExchange}>Enviar</button>
        </div>
      </div>
    </div>
  );
}

export default VisualizeExchange;
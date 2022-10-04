import React, { useState, useEffect } from "react";
import HeaderGen from "../../components/HeaderGen";
import { exchangeInfo } from "../../constants";
import { getProductsbyId, getUsersById } from "../../api";
import ExchangeWindow from "../../components/Exchange";
import UserInfo from "../../components/UserInfo";
import { useNavigate } from "react-router-dom";

import "./index.scss";

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
    const fetchUser = await getUsersById({id: fetchOtherProduct.product.id})
    setUser(fetchUser)
    setMyProduct(fetchMyProduct);
    setOtherProduct(fetchOtherProduct);
  }

  useEffect(() => {
    fetch()
  }, [])


  return (
    <div className="exchange-request">
      <HeaderGen text="Visualizar intercambio" />
      <div className="exchange-request__body">
        <ExchangeWindow myProduct={myProduct?.product} otherProduct={otherProduct?.product} myProfile={myProduct?.product?.usuario} otherProfile={otherProduct?.product?.usuario} />
        <div className="exchange-request__body-description">
          <span className="exchange-request__body-description-text">Descripcion del otro producto</span>
          <span className="exchange-request__body-description-info">{otherProduct?.product?.descripcion}</span>
        </div>
        <div className="exchange-request__body-user">
          <span className="exchange-request__body-user-text">¿Con quien intercambias?</span>
          <UserInfo profile={user} />
        </div>
        <div className="exchange-request__body-message-box">
          <span className="exchange-request__body-message-text">Enviale un mensaje!</span>
          <textarea className="exchange-request__body-message" placeholder="¡Hola!, estoy interesado en este producto" />
        </div>
        <div className="exchange-request__body-bottom">
          {
            button
          }
        </div>
      </div>
    </div>
  );
}

export default VisualizeExchange;
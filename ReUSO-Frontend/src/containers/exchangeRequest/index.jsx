import React, { useState, useEffect } from "react";
import HeaderGen from "../../components/HeaderGen";
import { useNavigate } from "react-router-dom";
import { exchangeInfo } from "../../constants";

import "./index.scss";
import ExchangeWindow from "../../components/Exchange";
import UserInfo from "../../components/UserInfo";

const ExchangeRequest = () => {
  const info = exchangeInfo[1];
  const [color, setColor] = useState("");
  const [button, setButton] = useState("");

  useEffect(() => {
    switch (info.status) {
      case "Pendiente...":
        // console.log("Pendiente...", info.status, info.status === "Pendiente...");
        setColor('#F6C824');
        setButton(<button className="exchange-request__body-bottom-button--canceled"> Cancelar intercambio</button>)
        break;
      case "Exitoso":
        // console.log("Exitoso", info.status, info.status === "Exitoso");
        setColor('#4CAF50');
        setButton(<button className="exchange-request__body-bottom-button--accepted"> Ir a whatsapp</button>)
        break;
      default:
        // console.log("default", info.status, info.status === "Pendiente...");
        setColor('#AF4C4C');
        setButton(<button className="exchange-request__body-bottom-button--rejected"> Volver al Inicio</button>)
    }
  }, [info.status]);


  return (
    <div className="exchange-request">
      <HeaderGen text="Solicitud de intercambio" />
      <div className="exchange-request__state">
        <span style={{color: color}} className="exchange-request__state-status">{info.status}</span>
      </div>
      <ExchangeWindow myProduct={info.myProduct} otherProduct={info.otherProduct} myProfile={info.myUserInfo} profile={info.userInfo} />
      <div className="exchange-request__body">
        <div className="exchange-request__body-description">
          <span className="exchange-request__body-description-text">Descripcion de el producto</span>
          <span className="exchange-request__body-description-info">{info.otherProduct.description}</span>
        </div>
        <div className="exchange-request__body-user">
          <span className="exchange-request__body-user-text">Usuario que intercambias</span>
          <UserInfo profile={info.userInfo} />
        </div>
        <div className="exchange-request__body-message">
          <span className="exchange-request__body-message-text">Mensaje que le enviaste</span>
          <span className="exchange-request__body-message-info">{info.message}</span>
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

export default ExchangeRequest;
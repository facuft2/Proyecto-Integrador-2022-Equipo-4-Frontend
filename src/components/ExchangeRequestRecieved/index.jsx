import React, { useState, useEffect } from "react";

import HeaderGen from "../../components/HeaderGen";
import ExchangeWindow from "../../components/Exchange";
import UserInfo from "../../components/UserInfo";

import "./index.scss";

const ExchangeRequestRecieved = ({ exchange }) => {
  const [color, setColor] = useState("");
  const [button, setButton] = useState("");
  const [exchangeState, setExchangeState] = useState();

  useEffect(() => {
    switch (exchange?.estado) {
      case "ESPERANDO":
        setColor('#F6C824');
        setExchangeState('Pendiente...');
        setButton(<button className="exchange-request__body-bottom-button--canceled"> Cancelar intercambio</button>)
        break;
      case "EXITOSO":
        setColor('#4CAF50');
        setExchangeState('Exitoso!');
        setButton(<button className="exchange-request__body-bottom-button--accepted"> Ir a whatsapp</button>)
        break;
      default:
        setColor('#AF4C4C');
        setExchangeState('')
        setButton(<button className="exchange-request__body-bottom-button--rejected"> Volver al Inicio</button>)
    }
  }, [exchange]);


  return (
    <div className="exchange-request">
      <div className="exchange-request__body">
        <HeaderGen text="Solicitud de intercambio" />
        <div className="exchange-request__state">
          <span style={{ color: color }} className="exchange-request__state-status">{exchangeState}</span>
        </div>
        <ExchangeWindow myProduct={exchange?.producto_recibido} otherProduct={exchange?.producto_enviado} myProfile={exchange?.producto_recibido?.usuario} otherProfile={exchange?.producto_enviado?.usuario} />
        <div className="exchange-request__body-description">
          <span className="exchange-request__body-description-text">Descripcion de el producto</span>
          <span className="exchange-request__body-description-info">{exchange?.producto_enviado?.descripcion}</span>
        </div>
        <div className="exchange-request__body-user">
          <span className="exchange-request__body-user-text">Con quien intercambias?</span>
          <UserInfo profile={exchange?.producto_enviado?.usuario} />
        </div>
        <div className="exchange-request__body-message">
          <span className="exchange-request__body-message-text">Mensaje que recibiste</span>
          <span className="exchange-request__body-message-info">{exchange?.mensaje}</span>
        </div>
        <div className="exchange-request__body-bottom-recieved">
          <button className="exchange-request__body-bottom-recieved-button--reject">Rechazar</button>
          <button className="exchange-request__body-bottom-recieved-button--accept">Aceptar</button>
        </div>
      </div>
    </div>
  );
}

export default ExchangeRequestRecieved;
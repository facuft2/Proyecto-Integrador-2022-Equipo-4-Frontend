import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import HeaderGen from "../../components/HeaderGen";
import { getExchangeById } from "../../api";
import ExchangeWindow from "../../components/Exchange";
import UserInfo from "../../components/UserInfo";

import "./index.scss";

const ExchangeRequest = () => {
  const [color, setColor] = useState("");
  const [button, setButton] = useState("");
  const [exchange, setExchange] = useState();
  const [exchangeState, setExchangeState] = useState();
  const { id } = useParams();

  useEffect(() => {
    Promise.all(getExchangeById(id)
    .then((data) =>
      setExchange(data)
    ))
  }, []) 

  useEffect(() => {
    switch (exchange?.estado) {
      case "ESPERANDO":
        // console.log("Pendiente...", info.status, info.status === "Pendiente...");
        setColor('#F6C824');
        setExchangeState('Pendiente...');
        setButton(<button className="exchange-request__body-bottom-button--canceled"> Cancelar intercambio</button>)
        break;
      case "EXITOSO":
        // console.log("Exitoso", info.status, info.status === "Exitoso");
        setColor('#4CAF50');
        setExchangeState('Exitoso!');
        setButton(<button className="exchange-request__body-bottom-button--accepted"> Ir a whatsapp</button>)
        break;
      default:
        // console.log("default", info.status, info.status === "Pendiente...");
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
        <span style={{color: color}} className="exchange-request__state-status">{exchangeState}</span>
      </div>
      <ExchangeWindow myProduct={exchange?.producto_enviado} otherProduct={exchange?.producto_recibido} myProfile={exchange?.producto_enviado?.usuario} otherProfile={exchange?.producto_recibido?.usuario} />
        <div className="exchange-request__body-description">
          <span className="exchange-request__body-description-text">Descripcion de el producto</span>
          <span className="exchange-request__body-description-info">{exchange?.producto_recibido?.descripcion}</span>
        </div>
        <div className="exchange-request__body-user">
          <span className="exchange-request__body-user-text">Usuario que intercambias</span>
          <UserInfo profile={exchange?.producto_recibido?.usuario} />
        </div>
        <div className="exchange-request__body-message">
          <span className="exchange-request__body-message-text">Mensaje que le enviaste</span>
          <span className="exchange-request__body-message-info">{exchange?.mensaje}</span>
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
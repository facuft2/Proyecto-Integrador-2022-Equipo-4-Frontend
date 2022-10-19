import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getExchangeById } from "../../api";
import HeaderGen from "../../components/HeaderGen";
import ExchangeWindow from "../../components/Exchange";
import UserInfo from "../../components/UserInfo";

import "./index.scss";

const ExchangeRequest = () => {
  const [color, setColor] = useState("");
  const [button, setButton] = useState("");
  const [exchangeState, setExchangeState] = useState();
  const [exchange, setExchange] = useState();

  const { id } = useParams()

  useEffect(() => {
    getExchangeById(id)
      .then((data) => {
        setExchange(data)
      })
  }, [])

  // console.log('enviado')

  useEffect(() => {
    switch (exchange?.estado) {
      case "ESPERANDO":
        setColor('#F6C824');
        setExchangeState('Pendiente...');
        setButton(<button className="exchange-request__body-bottom-button--canceled"> Cancelar intercambio</button>)
        break;
      case "ACEPTADO":
        setColor('#4CAF50');
        setExchangeState('Exitoso!');
        setButton(<button className="exchange-request__body-bottom-button--accepted"> Ir a whatsapp</button>)
        break;
      default:
        setColor('#AF4C4C');
        setExchangeState('Cancelado')
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
        <ExchangeWindow myProduct={exchange?.tu_producto} otherProduct={exchange?.otro_producto} myProfile={exchange?.tu_producto?.usuario} otherProfile={exchange?.otro_producto?.usuario} />
        <div className="exchange-request__body-description">
          <span className="exchange-request__body-description-text">Descripcion de el producto</span>
          <span className="exchange-request__body-description-info">{exchange?.otro_producto?.descripcion}</span>
        </div>
        <div className="exchange-request__body-user">
          <span className="exchange-request__body-user-text">Con quien intercambias?</span>
          <UserInfo profile={exchange?.otro_producto?.usuario} />
        </div>
        <div className="exchange-request__body-message">
          <span className="exchange-request__body-message-text">{exchange?.isRecieved ? 'Mensaje que te envio' : 'Mensaje que le enviaste'}</span>
          <span className="exchange-request__body-message-info">{exchange?.mensaje}</span>
        </div>
        <div className="exchange-request__body-bottom">
          {
            exchange?.isRecieved ? 
            <div className="exchange-request__body-bottom">
              <button className="exchange-request__body-bottom-button--reject">Rechazar</button>
              <button className="exchange-request__body-bottom-button--accept">Aceptar</button>
            </div> : button
          }
        </div>
      </div>
    </div>
  );
}

export default ExchangeRequest;
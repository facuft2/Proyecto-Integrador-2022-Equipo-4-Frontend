import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import { editExchange, getExchangeById } from "../../api";
import { ReactComponent as Arrow } from "../../assets/iconsInUse/repeat.svg";

import './index.scss';

const ExchangeInfo = ({ myProduct, otherProduct, recieved, exchangeId, exchangeState }) => {
  const navigate = useNavigate();
  const [exchangeStateMod, setExchangeStateMod] = useState(exchangeState)
  const [color, setColor] = useState('#F6C824')

  const editExchangeState = (state) => {
    toast.promise(
      editExchange({ id: exchangeId, state }), {
      pending: 'Editando estado',
      success: 'Estado editado',
      error: 'El intercambio no se puedo editar'
    }).then ((data) =>
    getExchangeById(exchangeId)
    .then((data) => {
      setExchangeStateMod(data.estado)
    })
  )
  }

  useEffect(() => {
    switch (exchangeStateMod) {
      case "ESPERANDO":
        setColor('#F6C824');
        break;
      case "ACEPTADO":
        setColor('#4CAF50');
        break;
      default:
        setColor('#AF4C4C');
    }
  }, [exchangeStateMod]);

  return (
    <div className="exchange-info">
      <div className="exchange-info-color" style={{ backgroundColor: color }}></div>
      <div className="exchange-info__container">
        <div className="exchange-info__object">
          <span className="exchange-info__object-text">{myProduct.titulo}</span>
          <img className="exchange-info__object-image" src={myProduct.foto} alt={myProduct.titulo} />
        </div>
        <div className="exchange-info__object-arrow">
          <Arrow className="exchange-info__object-arrow" />
        </div>
        <div className="exchange-info__object">
          <span className="exchange-info__object-text">{otherProduct.titulo}</span>
          <img className="exchange-info__object-image" src={otherProduct.foto} alt={otherProduct.titulo} />
        </div>
      </div>
      <div className="exchange-info__button">
        <button className="exchange-info__button-button" onClick={() => navigate(`/exchangeRequest/${exchangeId}`)}>Ver informacion</button>
        {(recieved && exchangeStateMod === "ESPERANDO") &&
          <div className="exchange-info__button-buttons">
            <button onClick={() => editExchangeState('ACEPTADO')} className="exchange-info__button-accept">Aceptar</button>
            <button onClick={() => editExchangeState('RECHAZADO')} className="exchange-info__button-reject">Rechazar</button>
          </div>
        }
      </div>
    </div>
  );
};

export default ExchangeInfo;
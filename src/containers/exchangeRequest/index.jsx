import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';

import { getExchangeById, editExchange } from "../../api";
import HeaderGen from "../../components/HeaderGen";
import ExchangeWindow from "../../components/Exchange";
import UserInfo from "../../components/UserInfo";

import "./index.scss";

const ExchangeRequest = () => {
  const navigate = useNavigate()
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
  
  const message = `Hola! soy ${exchange?.tu_producto.usuario.nombre}, de la aplicacion reuso, me queria comunicar con vos para concretar el intercambio de mi ${exchange?.tu_producto.titulo} y tu ${exchange?.otro_producto.titulo}`

  const editExchangeState = (state) => {
    toast.promise(
      editExchange({ id, state }), {
      pending: 'Editando estado',
      success: 'Estado editado',
      error: 'El intercambio no se puedo editar'
    }).then ((data) =>
      getExchangeById(id)
      .then((data) => {
        setExchange(data)
      })
    )
  }

  useEffect(() => {
    switch (exchange?.estado) {
      case "ESPERANDO":
        setColor('#F6C824');
        setExchangeState('Pendiente');
        setButton(<button onClick={() => editExchangeState('RECHAZADO')} className="exchange-request__body-bottom-button--canceled"> Cancelar intercambio</button>)
        break;
      case "ACEPTADO":
        setColor('#4CAF50');
        setExchangeState('Aceptado');
        setButton(<button onClick={() => window.open(`https://wa.me/+598${exchange?.otro_producto.usuario.telefono}?text=${message.replace(' ', '%20')}`, '_blank')} className="exchange-request__body-bottom-button--accepted"> Ir a whatsapp</button>)
        break;
      default:
        setColor('#AF4C4C');
        setExchangeState('Cancelado')
        setButton(<button onClick={() => navigate('/', { replace: false }) } className="exchange-request__body-bottom-button--rejected"> Volver al Inicio</button>)
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
            exchange?.isRecieved && exchange?.estado === "ESPERANDO" ?
              <div className="exchange-request__body-bottom">
                <button onClick={() => editExchangeState('ACEPTADO')} className="exchange-request__body-bottom-button--accept">Aceptar</button>
                <button onClick={() => editExchangeState('RECHAZADO')} className="exchange-request__body-bottom-button--reject">Rechazar</button>
              </div> : button
          }
        </div>
      </div>
    </div>
  );
}

export default ExchangeRequest;
import React, { useState } from "react";
import HeaderGen from "../../components/HeaderGen";
// import { exchangeInfo } from "../../constants/index";
import ExchangeInfo from "../../components/Exchange_info";
import { getExchangeByParams } from "../../api";

import "./index.scss";
import { useEffect } from "react";

const Exchanges = () => {
  const [sended, setSended] = useState(false);
  const [exchanges, setExchanges] = useState()

  useEffect(() => {
    Promise.all(getExchangeByParams(sended)
      .then((data) => {
        setExchanges(data)
      })
      .catch())
  }, [sended])

  return (
    <div className="exchanges">
      <HeaderGen text="Mis intercambios" />
      <div className="exchanges__body">
        <div className="exchanges__body-select">
          <button onClick={() => setSended(true)} className={`exchanges__body-select-ed ${sended && 'active'}`}>Enviados</button>
          <button onClick={() => setSended(false)} className={`exchanges__body-select-ed ${!sended && 'active-recieved'}`}>Recibidos</button>
        </div>
        <div className="exchanges__body-items">
          {
            exchanges?.map(({ producto_enviado, producto_recibido, id }) => (
              <ExchangeInfo myProduct={producto_enviado} otherProduct={producto_recibido} recieved={!sended} exchangeId={id} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Exchanges;

import React, { useState } from "react";
import HeaderGen from "../../components/HeaderGen";
import { exchangeInfo } from "../../constants/index";
import ExchangeInfo from "../../components/Exchange_info";

import "./index.scss";

const Exchanges = () => {
  const [sended, setSended] = useState(false);
  const info = exchangeInfo[0];

  console.log(exchangeInfo.filter((info) => info.recieved !== sended));

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
            exchangeInfo.filter((info) => info.recieved !== sended).map((info) => (
              <ExchangeInfo myProduct={info.myProduct} otherProduct={info.otherProduct} recieved={info.recieved} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Exchanges;

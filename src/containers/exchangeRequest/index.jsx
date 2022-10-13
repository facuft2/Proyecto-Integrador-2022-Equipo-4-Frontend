import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getExchangeById } from "../../api";
import ExchangeRequestRecieved from "../../components/ExchangeRequestRecieved/index";
import ExchangeRequestSended from "../../components/ExchangeRequestSended/index";

const ExchangeRequest = () => {
  const [isRecieved, setIsRecieved] = useState();
  const [exchange, setExchange] = useState();
  const { id } = useParams();

  useEffect(() => {
    getExchangeById(id)
      .then((data) => {
        setIsRecieved(data.producto_recibido.userId === parseInt(id, 10));
        setExchange(data)
      })
  }, [])

  // console.log(isRecieved)


  return isRecieved ? <ExchangeRequestRecieved exchange={exchange} /> : <ExchangeRequestSended exchange={exchange} />
}

export default ExchangeRequest;
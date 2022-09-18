import React, { useState, useEffect } from "react";
import Object from "../Object";
import './index.scss'

const Category = ({ data }) => {
  const contentAvailable = Math.floor(window.innerWidth / 180);
  const [isAvailable, setIsAvailable] = useState();
  const [numeroFlecha, setNumeroFlecha] = useState(0);

  useEffect(() => {
    setIsAvailable(contentAvailable < data.producto.length && numeroFlecha + contentAvailable < data.producto.length)
  }, [numeroFlecha])

  return (
    <div className="card-box">
      {numeroFlecha ? <button className="card-box-button" onClick={() => setNumeroFlecha((value) => value - contentAvailable)}> &lt; </button> : null}
      {data.producto && data.producto.slice(numeroFlecha, numeroFlecha + contentAvailable).map((producto, index) => (
        <Object key={index} id={producto?.id} title={producto?.titulo} foto={producto?.foto} trueque={producto?.tipo_trato} />
      ))
      }
      {isAvailable ? <button className="card-box-button right" onClick={() => setNumeroFlecha((value) => value + contentAvailable)}> &gt; </button> : null}
    </div>
  )
}

export { Category }

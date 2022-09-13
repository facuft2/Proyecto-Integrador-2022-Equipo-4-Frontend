import React, { useState, useEffect } from "react";
import HeaderGen from "../../components/HeaderGen";
import { fakeUsers } from "../../constants";
import Object from "../../components/Object";
import { useNavigate } from "react-router-dom";


import "./index.scss";
import { getMyProducts } from "../../api";

const Inventory = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState()
  const id = localStorage.getItem('id')
  async function cosito() {
    setProducts(await getMyProducts({id}))
  }

  useEffect(( ) => {
    cosito()
  },[])

  return (
    <div className="inventory">
      <HeaderGen text="Mi inventario" />
      <div className="inventory__body">
        {products?.map((card) => (
          <div className="inventory__body-item">
            <Object
              foto={card?.foto}
              id={card?.id}
              title={card?.titulo}
              trueque={card?.trueque === "INTERCAMBIO" ? true : false}
            />
          </div>
        ))}
      </div>
      <button className="inventory-button" onClick={() => navigate('/addItem', { replace: false })}> Subir objeto </button>
    </div>
  );
};

export default Inventory;

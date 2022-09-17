import React, { useState, useEffect } from "react";

import { getMyProducts } from "../../api";
import HeaderGen from "../../components/HeaderGen";
import { AddItemButton } from "../../components/AddItemButton";
import Object from "../../components/Object";

import "./index.scss";

const Inventory = () => {
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
      <AddItemButton />
    </div>
  );
};

export default Inventory;

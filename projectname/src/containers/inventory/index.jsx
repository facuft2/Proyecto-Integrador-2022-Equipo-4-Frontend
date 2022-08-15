import React from "react";
import HeaderGen from "../../components/HeaderGen";
import { fakeUsers } from "../../constants";
import Object from "../../components/Object";
import { useNavigate } from "react-router-dom";

import "./index.scss";

const Inventory = () => {
  return (
    <div className="inventory">
      <HeaderGen text="Mi inventario" />
      <div className="inventory__body">
        {fakeUsers[0].productos.map((card) => (
          <div className="inventory__body-item">
            <Object
              image={card.image}
              id={card.id}
              title={card.title}
              trueque={card.trueque}
            />
          </div>
        ))}
      </div>
      <button className="inventory-button"> Subir objeto </button>
    </div>
  );
};

export default Inventory;

import React from "react";
import { useNavigate } from "react-router-dom";
import './index.scss';

const Object = ({image, id, title, trueque}) => {
  const navigate = useNavigate();

  return (
    <div className="card">
      <img
        className="card-image"
        alt="card"
        src={image}
        onClick={() => {
          navigate(`/product/${id}`);
        }}
      />
      <div className="card-info">
        <div className="card-title">
          <span> {title} </span>
        </div>
        <div className="card-type">
          <span>tipo: {trueque ? "trueque" : "intercambio"} </span>
        </div>
      </div>
    </div>
  );
};

export default Object;

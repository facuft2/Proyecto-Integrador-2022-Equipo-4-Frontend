import React from "react";
import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom";
import './index.scss';

const Object = ({ id, title, trueque, foto, available, descripcion }) => {
  const navigate = useNavigate();
  
  return (
    <div className="card">
      <img
        className="card-image"
        alt="card"
        src={foto}
        onClick={() => {
          available && navigate(`/product/${id}`);
        }}
      />
      <div className="card-info">
        <div className="card-title">
          {title}
        </div>
        <div className="card-desc">
          {descripcion}
        </div>
      </div>
    </div>
  );
};

Object.propTypes = {
  available: PropTypes.bool
}

Object.defaultProps = {
  available: true
};

export default Object;

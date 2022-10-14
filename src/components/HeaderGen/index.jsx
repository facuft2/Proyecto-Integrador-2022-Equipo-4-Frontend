import React from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as Arrow } from "../../assets/iconsInUse/arrow-left-1.svg";

import "./index.scss";

const HeaderGen = ({ text }) => {
  const navigate = useNavigate();

  return (
    <div className="header-gen">
      <Arrow className="header-gen-arrow" 
      onClick={() => {navigate(-1)}} />
      <span className="header-gen-text">{text}</span>
    </div>
  );
};

export default HeaderGen;

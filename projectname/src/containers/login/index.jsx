import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import axios from 'axios'
import { Icon } from "@iconify/react";
import { useEffect } from "react";

const SignIn = () => {
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('http://10.1.11.183:4000/usuarios').then(
      console.log('hola')
    )
  },[]) 
 

  return (
    <div className="sign-in">
      <span className="sign-in__title-text">Ingresar</span>
      <div className="sign-in__input-container">
        <div className="input-w-icon">
          <Icon icon="ic:round-email" className="input-icon" height="19" />
          <input
            className="sign-in__input"
            placeholder="Email"
            type="text"
            name="name"
          />
        </div>
        <div className="input-w-icon">
          <Icon icon="bxs:lock" className="input-icon" height="19" />
          <input
            className="sign-in__input"
            placeholder="Password"
            type="password"
            name="password"
          />
        </div>
      </div>
      <button
        className="sign-in__button"
        onClick={() => navigate("/", { replace: true })}
      >
        iniciar sesion
      </button>
      <span className="sign-in__message">
        ¿No tienes una cuenta?
        <span
          className="sign-in__message-green"
          onClick={() => navigate("/register", { replace: true })}
        >
          Registrarse
        </span>
      </span>
    </div>
  );
};

export default SignIn;

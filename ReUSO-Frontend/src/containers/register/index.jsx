import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { Icon } from "@iconify/react";

const Register = () => {
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  return (
    <div className="register">
      <span className="register__title-text">Crea una cuenta</span>
      <div className="register__input-container">
        <div className="input-w-icon">
          <Icon icon="bi:person-fill" className="input-icon" height="19" />
          <input
            className="register__input"
            placeholder="Nombre"
            type="text"
            name="User"
          />
        </div>
        <div className="input-w-icon">
          <Icon icon="ic:round-email" className="input-icon" height="19" />
          <input
            className="register__input"
            placeholder="Email"
            type="text"
            name="Email"
          />
        </div>
        <div className="input-w-icon">
          <Icon icon="bxs:lock" className="input-icon" height="19" />
          <input
            className="register__input"
            placeholder="Contraseña"
            type="password"
            name="password"
          />
        </div>
        <div className="input-w-icon">
          <Icon icon="bxs:lock" className="input-icon" height="19" />
          <input
            className="register__input"
            placeholder="Confirmar contraseña"
            type="password"
            name="password"
          />
        </div>
      </div>
      <button
        className="register__button"
        onClick={() => navigate("/signIn", { replace: true })}
      >
        Registrarse
      </button>
      <span className="register__message">
        ¿Tienes una cuenta?
        <span
          className="register__message-green"
          onClick={() => navigate("/signIn", { replace: true })}
        >
          Iniciar sesion
        </span>
      </span>
    </div>
  );
};

export default Register;

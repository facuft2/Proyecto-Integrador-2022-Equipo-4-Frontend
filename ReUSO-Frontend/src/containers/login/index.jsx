import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/index";
import "./index.scss";
import { Icon } from "@iconify/react";
import { useEffect } from "react";

const SignIn = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();
 
  const useLogin = () => {
      login({email, password}).then((response) => {
        response.status === 200 && navigate('/', { replace: false })
      }).catch((error) => {
        setErrorMessage(error.response.data.error)
      })
  }

  return (
    <div className="sign-in">
      <span className="sign-in__title-text">Ingresar</span>
      <div className="sign-in__input-container">
        <div className="sign-in__input-w-icon">
          <Icon icon="ic:round-email" className="input-icon" height="19" />
          <input
            className="sign-in__input"
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            name="name"
          />
        </div>
        <div className="sign-in__input-w-icon">
          <Icon icon="bxs:lock" className="input-icon" height="19" />
          <input
            className="sign-in__input"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          />
        </div>
      </div>
      <span className="register-error">{errorMessage}</span>
      <button
        className="sign-in__button"
        onClick={useLogin}
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

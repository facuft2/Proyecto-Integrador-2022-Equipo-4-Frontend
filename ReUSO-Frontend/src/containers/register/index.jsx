import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { Icon } from "@iconify/react";
import { register } from "../../api";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [verifyPassword, setVerifyPassword] = useState();
  const [email, setEmail] = useState();
  const [apellido, setApellido] = useState();
  const [resMessage, setResMessage] = useState();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (password !== verifyPassword) {
      setResMessage('Las contraseñas deben ser iguales')
    } else {
      const data = await register({ nombre: name, apellido, email, contrasenia: password })
        console.log(data)
        data.status === 201 ?
        navigate('/', {replace: false}) :
        setResMessage(data.data.code)
    }
  }

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
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-w-icon">
          <Icon icon="bi:person-fill" className="input-icon" height="19" />
          <input
            className="register__input"
            placeholder="Apellido"
            type="text"
            name="User"
            onChange={(e) => setApellido(e.target.value)}
          />
        </div>
        <div className="input-w-icon">
          <Icon icon="ic:round-email" className="input-icon" height="19" />
          <input
            className="register__input"
            placeholder="Email"
            type="text"
            name="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-w-icon">
          <Icon icon="bxs:lock" className="input-icon" height="19" />
          <input
            className="register__input"
            placeholder="Contraseña"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-w-icon">
          <Icon icon="bxs:lock" className="input-icon" height="19" />
          <input
            className="register__input"
            placeholder="Confirmar contraseña"
            type="password"
            name="password"
            onChange={(e) => setVerifyPassword(e.target.value)}
          />
        </div>
        <span>{resMessage?.code === 'Success' ? 'Usuario registrado correctamente' : resMessage?.code}</span>
      </div>
      <button
        className="register__button"
        onClick={handleSubmit}
      >
        Registrarse
      </button>
      <span className="register__message">
        ¿Tienes una cuenta?
        <span
          className="register__message-green"
          onClick={() => navigate("/login", { replace: true })}
        >
          Iniciar sesion
        </span>
      </span>
    </div>
  );
};

export default Register;

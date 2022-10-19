import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { Icon } from "@iconify/react";
import { register } from "../../api";
import { useEffect } from "react";
import { Input } from "../../components/Input/Input";

const Register = () => {
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [verifyPassword, setVerifyPassword] = useState();
  const [email, setEmail] = useState();
  const [apellido, setApellido] = useState();
  const [resMessage, setResMessage] = useState();
  const [nameError, setNameError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [verifyPasswordError, setVerifyPasswordError] = useState();
  const [emailError, setEmailError] = useState();
  const [apellidoError, setApellidoError] = useState();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name) {
      setNameError("Ingrese un nombre");
    }
    if (!apellido) {
      setApellidoError("Ingrese un apellido");
    }
    if (!email) {
      setEmailError("Ingrese un email");
    } else if (!email.includes("@") || !email.includes(".")) {
      setEmailError("Ingrese un email valido");
    }
    if (!password) {
      setPasswordError("Ingrese una contraseña");
    } else if (password.length < 8) {
      setPasswordError("La contraseña debe tener al menos 8 caracteres");
    } else if (password !== verifyPassword) {
      setVerifyPasswordError("Las contraseñas no coinciden");
    }

    if (!verifyPassword) {
      setVerifyPasswordError("Ingrese una contraseña");
    } else if (verifyPassword.length < 8) {
      setVerifyPasswordError("La contraseña debe tener al menos 8 caracteres");
    } else if (verifyPassword !== password) {
      setVerifyPasswordError("Las contraseñas no coinciden");
    }

    if (
      password &&
      name &&
      apellido &&
      email &&
      verifyPassword &&
      (password === verifyPassword) &&
      (email.includes("@") || email.includes("."))) {
      try {
        const response = await register({
          nombre: name,
          apellido,
          email,
          contrasenia: password,
        });
        if (response.status === 201) {
          navigate("/", { replace: false });
        }
      } catch (error) {
        setResMessage(error.response.data.error)
      }
    }
  };

  useEffect(() => {
    if (name) {
      setNameError("");
    }
    if (apellido) {
      setApellidoError("");
    }
    if (email) {
      setEmailError("");
    }
    if (password) {
      setPasswordError("");
    }
    if (verifyPassword) {
      setVerifyPasswordError("");
    }
  }, [name, apellido, email, password, verifyPassword]);

  useEffect(() => {
    localStorage.clear()
  }, []);

  return (
    <div className="register">
      <span className="register__title-text">Crea una cuenta</span>
      <div className="register__input-container">
        <Input
          label="Nombre"
          name="name"
          type="text"
          onChange={(value) => setName(value)}
          error={nameError}
        >
          <Icon icon="mdi:account" className="input__icon" />
        </Input>
        <Input
          label="Apellido"
          name="apellido"
          type="text"
          onChange={(value) => setApellido(value)}
          error={apellidoError}
        >
          <Icon icon="mdi:account" className="input__icon" />
        </Input>
        <Input
          label="Email"
          name="email"
          type="email"
          onChange={(value) => setEmail(value)}
          error={emailError}
        >
          <Icon icon="mdi:email" className="input__icon" />
        </Input>
        <Input
          label="Contraseña"
          name="password"
          type="password"
          onChange={(value) => setPassword(value)}
          error={passwordError}
        >
          <Icon icon="mdi:lock" className="input__icon" />
        </Input>
        <Input
          label="Verificar contraseña"
          name="verifyPassword"
          type="password"
          onChange={(value) => setVerifyPassword(value)}
          error={verifyPasswordError}
        >
          <Icon icon="mdi:lock" className="input__icon" />
        </Input>
      </div>
      <span className="register-error">{resMessage}</span>
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

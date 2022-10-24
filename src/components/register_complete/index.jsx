import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { postUserImages, register, verifyCode, verifyNumber } from "../../api";
import { ReactComponent as Camera } from '../../assets/iconsInUse/camera.svg';
import HeaderGen from "../../components/HeaderGen";

import './index.scss';

const RegisterComplete = ({ name, apellido, email, password, errorSetter, setComplete }) => {
  const navigate = useNavigate();
  const [foto_perfil, setFoto_perfil] = useState();
  const [foto_perfil_preview, setFoto_perfil_preview] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
  const [numero, setNumero] = useState()
  const [descripcion, setDescripcion] = useState();
  const [message, setMessage] = useState();
  const [verified, setVerified] = useState(false);
  const [code, setCode] = useState();
  const [verifyDisplay, setVerifyDisplay] = useState();

  useEffect(() => {
    if (foto_perfil) {
      setFoto_perfil_preview(URL.createObjectURL(foto_perfil));
    }
  }, [foto_perfil]);

  const handleVerify = () => {
    if (!numero) {
      setMessage("Ingrese un numero de telefono");
    } else if (numero.length < 8) {
      setMessage("Ingrese un numero de telefono valido");
    } else {
      verifyNumber({ numero }).then(() => {
        setVerifyDisplay(true);
      }).catch((err) => {
        setMessage(err.response.data.code);
      });
    }
  };

  const handleVerifyCode = () => {
    if (!code) {
      setMessage("Ingrese el codigo de verificacion");
    } else {
      verifyCode({ numero, code }).then(() => {
        setVerified(true);
      }).catch((err) => {
        setMessage(err.response.data.code);
      });
    }
  };

  const handleSubmit = () => {
    if ((!numero || numero.length < 8) && !verified) {
      return setMessage('Debes ingresar un numero valido')
    } else {
      if (foto_perfil) {
        const formData = new FormData();
        formData.append('foto_perfil', foto_perfil);

        postUserImages({ foto: formData.get('foto_perfil') }).then((data) => {
          register({
            nombre: name,
            apellido,
            email,
            contrasenia: password,
            numero,
            foto_perfil: data,
            descripcion
          }).then(() => {
            navigate('/', { replace: false })
          }).catch(({ error }) => {
            setMessage(error)
          })
        })
      } else {
        register({
          nombre: name,
          apellido,
          email,
          contrasenia: password,
          numero,
          foto_perfil: foto_perfil_preview,
          descripcion
        }).then(() => {
          navigate('/', { replace: false })
        }).catch(({ response }) => {
          if (response.data.error === 'Ya existe un usuario registrado con ese email') {
            errorSetter('Ya existe un usuario registrado con ese email')
            setComplete(false)
          }
          setMessage(response.data.error)
        })
      }
    }
  }

  useEffect(() => { setMessage('')},[numero])

  return (
    <div className="register_complete">
      <div className="register_complete__body">
        <div className="register_complete__body-photo-box">
          <div className="edit-profile__body-photo">
            <img className="edit-profile__body-photo-image" alt="foto de perfil" src={foto_perfil_preview} />
            <label className="add-item__image-edit" for="upload">
              <Camera className="edit-profile__body-photo-image-camera" />
            </label>
            <div className="add-item__image-edit-button">
              <input
                type="file"
                id="upload"
                accept="image/*"
                onChange={(e) => {
                  setFoto_perfil(e.target.files[0])
                }}
              />
            </div>
          </div>
        </div>
        <div className="register_complete__body-inputs-container">
          <div className="register_complete__body-inputs-container-box">
            <span>Descripcion:</span>
            <textarea type="text" className="register_complete__body-inputs-container-box-input--descripcion" onChange={(e) => setDescripcion(e.target.value)} value={descripcion} />
          </div>
          <div className="register_complete__body-inputs-container-box">
            <span>Numero telefonico:</span>
            <div className="register_complete__body-inputs-container-box-input-container">
              <span className="register_complete__body-inputs-container-box-input-prefix">+598</span><textarea type="number" className="register_complete__body-inputs-container-box-input" onChange={(e) => !verifyDisplay && setNumero(e.target.value)} value={numero} /> <button className="register_complete__body-inputs-container-box-button" onClick={handleVerify}>Verificar</button>
            </div>
          </div>
          {verifyDisplay && <div className="register_complete__body-inputs-container-box">
            <span>Codigo de verificacion:</span>
            <div className="register_complete__body-inputs-container-box-input-container">
              <textarea type="number" className="register_complete__body-inputs-container-box-input" onChange={(e) => setCode(e.target.value)} value={code} /> <button className="register_complete__body-inputs-container-box-button" onClick={handleVerifyCode} > enviar codigo </button>
            </div>
          </div>}
          <span className="register-error">{message}</span>
        </div>
        {
          verified && 
          <div className="register_complete__body-button">
            <button className="register_complete__body-button--success" onClick={handleSubmit}>Guardar</button>
          </div>
        }
      </div>
    </div>
  )
}

export default RegisterComplete;

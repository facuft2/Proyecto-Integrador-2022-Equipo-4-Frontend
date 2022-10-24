import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { postUserImages, register, verifyCode, verifyNumber } from "../../api";
import { ReactComponent as Camera } from '../../assets/iconsInUse/camera.svg';
import HeaderGen from "../../components/HeaderGen";

import './index.scss';

const RegisterComplete = ({ name, apellido, email, password, errorSetter, setComplete }) => {
  const navigate = useNavigate();
  const [foto_perfil, setFoto_perfil] = useState();
  const [fotoPerfilPreview, setFotoPerfilPreview] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
  const [numero, setNumero] = useState()
  const [descripcion, setDescripcion] = useState();
  const [message, setMessage] = useState();
  const [verified, setVerified] = useState(false);
  const [code, setCode] = useState();
  const [verifyDisplay, setVerifyDisplay] = useState();
  const [button, setButton] = useState('Verificar');
  const [sendCodeButton, setSendCodeButton] = useState('Enviar codigo')

  const handleVerify = () => {
    if (!numero) {
      setMessage("Ingrese un numero de telefono");
    } else if (numero.length !== 8) {
      setMessage("Ingrese un numero de telefono valido");
    } else {
      setButton(<div class="lds-ring"><div></div><div></div><div></div><div></div></div>)
      verifyNumber({ numero }).then(() => {
        setVerifyDisplay(true);
      }).catch((err) => {
        setMessage(err.response.data.code);
      }).finally(() => setButton('Listo!'))
    }
  };

  const handleVerifyCode = () => {
    if (!code) {
      setMessage("Ingrese el codigo de verificacion");
    } else {
      setSendCodeButton(<div class="lds-ring"><div></div><div></div><div></div><div></div></div>)
      verifyCode({ numero, code }).then(() => {
        setVerified(true);
      }).catch((err) => {
        setMessage(err.response.data.code);
      }).finally(() => setSendCodeButton('Listo!'))
    }
  };

  const handleSubmit = () => {
    if ((!numero || numero.length < 8) && !verified) {
      return setMessage('Debes ingresar un numero valido')
    } else {
      if (foto_perfil) {
        const formData = new FormData();
        formData.append('foto_perfil', foto_perfil);

        toast.promise(
        postUserImages({ foto: formData.get('foto_perfil') }), {
          loading: 'Subiendo Imagen',
          success: 'Imagen subida correctamente',
          error: 'Error al subir imagen',
        }
        ).then((data) => {
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
          foto_perfil: fotoPerfilPreview,
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

  useEffect(() => {
    setMessage('')
    if(numero ?? false){
      const numberFormatted = parseInt(numero, 10) ?? 0
      console.log(numberFormatted.toString().length)
      setNumero(numberFormatted.toString())
    }
  },[numero])

  useEffect(() => {
    if (foto_perfil) {
      setFotoPerfilPreview(URL.createObjectURL(foto_perfil));
    }
  }, [foto_perfil]);

  return (
    <div className="register_complete">
      <div className="register_complete__body">
        <div className="register_complete__body-photo-box">
          <div className="edit-profile__body-photo">
            <img className="edit-profile__body-photo-image" alt="foto de perfil" src={fotoPerfilPreview} />
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
              <span className="register_complete__body-inputs-container-box-input-prefix">+598</span><textarea type="number" className="register_complete__body-inputs-container-box-input" onChange={(e) => !verifyDisplay && setNumero(e.target.value)} value={numero} /> <button className="register_complete__body-inputs-container-box-button" onClick={handleVerify}>{button}</button>
            </div>
          </div>
          {verifyDisplay && <div className="register_complete__body-inputs-container-box">
            <span>Codigo de verificacion:</span>
            <div className="register_complete__body-inputs-container-box-input-container">
              <textarea type="number" className="register_complete__body-inputs-container-box-input" onChange={(e) => setCode(e.target.value)} value={code} /> <button className="register_complete__body-inputs-container-box-button" onClick={handleVerifyCode}>{sendCodeButton}</button>
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

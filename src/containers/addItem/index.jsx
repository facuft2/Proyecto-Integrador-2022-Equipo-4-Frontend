import React, { useState } from "react";
import { toast } from 'react-toastify';

import HeaderGen from "../../components/HeaderGen";
import { fakeUsers } from "../../constants";
import { postProducts, getCategories } from "../../api";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Arrow } from "../../assets/iconsInUse/arrow-down.svg";
// import S3 from 'react-aws-s3';
import buffer from "buffer";

import "./index.scss";
import { useEffect } from "react";
import CategoryInput from "../../components/CategoryInput";

const AddItem = () => {
  window.Buffer = window.Buffer || buffer.Buffer;
  const navigate = useNavigate();
  const [image, setImage] = useState();
  const [showImage, setShowImage] = useState();
  const [titulo, setTitulo] = useState()
  const [descripcion, setDescripcion] = useState();
  const [cantidad, setCantidad] = useState();
  const [tipo_trato, setTipoTrato] = useState("INTERCAMBIO");
  const [categorySelected, setCategorySelected] = useState([]);
  const [categories, setCategories] = useState();
  const [inputContent, setInputContent] = useState('');
  const [displayCategories, setDisplayCategories] = useState(false);
  const foto_perfil = localStorage.getItem('fotoPerfil');

  const createProduct = () => {
    uploadFile().then((data) => {
      toast.promise(
        postProducts({
          titulo, descripcion, tipo_trato, cantidad, foto: data, categorias: categorySelected.map(({ id }) => id)
        }),
        {
          pending: 'Añadiendo producto',
          success: 'Producto creado',
          error: 'El producto no se pudo crear'
        })
      .then(
        navigate('/', { replace: false })
      )
    })
  }

  const removeFromCategories = (data) => {
    const index = categories.indexOf(data);
    categories[index] = []
    const modifyarray = [...categories].flat()
    setCategories(modifyarray)
    setCategorySelected((prev) => [...prev, data])
    setInputContent('')
  }

  const removeCategory = (data) => {
    setCategories([...categories, data].sort())
    const index = categorySelected.indexOf(data);
    categorySelected[index] = []
    const modifyarray = [...categorySelected].flat()
    setCategorySelected(modifyarray)
  }

  // const config = {
  //   bucketName: process.env.REACT_APP_BUCKET_NAME,
  //   region: process.env.REACT_APP_REGION,
  //   accessKeyId: process.env.REACT_APP_ACCESS,
  //   secretAccessKey: process.env.REACT_APP_SECRET,
  // }

  const uploadFile = async () => {
    // const ReactS3Client = new S3(config);

    // return await ReactS3Client
    //   .uploadFile(image, image.name)
    //   .then(data => data)
    //   .catch(err => console.error(err))
    return 'https://static.vecteezy.com/packs/media/vectors/term-bg-1-666de2d9.jpg'
  }

  async function category() {
    const allCategories = await getCategories()
    setCategories(allCategories.category)
  }



  useEffect(() => {
    category()
  }, [])

  useEffect(() => {
    image && setShowImage(URL.createObjectURL(image))
  }, [image])

  useEffect(() => {
    if (inputContent) {
      setDisplayCategories(true)
    } else {
      setDisplayCategories(false)
    }
  }, [inputContent])

  return (
    <div className="add-item">
      <HeaderGen text="Agregar un producto" />
      <div className="add-item__body">
        <div className="add-item__profile">
          <img
            className="add-item__profile-image"
            src={fakeUsers[0].icon}
            alt="profile"
          />
          <span className="add-item__profile-name">{fakeUsers[0].name}</span>
        </div>
        <div className="add-item__image-mother">
          <span className="add-item__image-text">Foto del producto</span>
          <div className="add-item__image-box">
            {!image ? (
              <>
                <label className="add-item__image-upload" for="upload">
                  Subir foto...
                </label>
                <input
                  type="file"
                  id="upload"
                  accept="image/*"
                  onChange={(e) => {
                    setImage(e.target.files[0])
                  }
                  }
                />
              </>
            ) : (
              <>
                <img className="add-item__image" src={showImage} alt="product" />
              </>
            )}
          </div>
          <div className="add-item__image-edit-container">
            {image && (
              <>
                <label className="add-item__image-edit" for="upload">
                  Editar foto...
                </label>
                <div className="add-item__image-edit-button">
                  <input
                    type="file"
                    id="upload"
                    accept="image/*"
                    onChange={(e) => {
                      setImage(e.target.files[0])
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="add-item__name">
          <span className="add-item__name-text">Nombre del producto</span>
          <textarea onChange={(e) => setTitulo(e.target.value)} type="text" className="add-item__name-input" />
        </div>
        <div className="add-item__description">
          <span className="add-item__description-text">
            Descripcion del producto
          </span>
          <textarea onChange={(e) => setDescripcion(e.target.value)} type="text" className="add-item__description-input" />
        </div>
        <div className="add-item__amount">
          <span className="add-item__amount-text">Cantidad</span>
          <input type="number" onChange={(e) => setCantidad(parseInt(e.target.value, 10))} className="add-item__amount-input" />
        </div>
        <div className="add-item__type">
          <span className="add-item__type-text">Tipo de trueque</span>
          <select className="add-item__type-input" onChange={(e) => setTipoTrato(e.target.value)}>
            <option value="INTERCAMBIO">intercambio</option>
            <option value="DONACION">donacion</option>
          </select>
        </div>
        <div className="add-item__type" >
          <span className="add-item__type-text">Categorias</span>
          <div className="add-item__categories" >
            <div className="add-item__categories-input-container">
              <input type="text"
                value={inputContent}
                onFocus={() => setDisplayCategories(true)}
                onChange={(e) => setInputContent(e.target.value)}
                className="add-item__categories-input"
              />
              <Arrow style={{ transform: `rotate(${displayCategories ? 0 : 90}deg)` }} onClick={() => setDisplayCategories((e) => !e)} />
            </div>
            {
              displayCategories &&
              categories?.filter((data) => data.nombre.includes(inputContent)).map((data) => (
                <div onClick={() => removeFromCategories(data)} className="add-item__categories-preview">
                  {data.nombre}
                </div>
              ))
            }
          </div>
          <div className="add-item__categories-selected">
            {categorySelected.map((data) => (
              <CategoryInput name={data.nombre} removeCategory={() => removeCategory(data)} />
            ))}
          </div>
        </div>

        <div className="add-item__button">
          <button className="add-item__button--cancel" onClick={() => navigate('/', { replace: true })}>Cancelar</button>
          <button className="add-item__button--add" onClick={() => createProduct()}>Agregar producto</button>
        </div>
      </div>
    </div>
  );
};

export default AddItem;

import axios from "axios";
import { getUserData, persistSession } from "./helpers";

const apiAxios = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

const register = (({
  nombre,
  apellido,
  email,
  contrasenia
}) => apiAxios.post('/users', {
  nombre,
  apellido,
  email,
  contrasenia
}).then((response) => {
  persistSession(response)
  return response
}))

const login = ({
  email,
  password,
}) => apiAxios.post('/login', {
  email,
  contrasenia: password,
})
  .then((response) => {
    persistSession(response);
    return response
  });

const getProducts = async () => {
  const { token } = getUserData();
  return await apiAxios.get('/product/categories',
    {
      headers: {
        token,
      },
    }).then(({ data }) => data);
};

const getProductsbyId = async ({ id }) => {
  const { token } = getUserData();
  return await apiAxios.get(`/product/${id}`,
    {
      headers: {
        token,
      },
    }).then(({ data }) => data);
};

const getUsersById = async ({ id }) => {
  const {
    token,
  } = getUserData();
  return await apiAxios.get(`/users/${id}`,
    {
      headers: {
        token,
      },
    }).then(({ data }) => {
      localStorage.setItem('username', `${data.nombre} ${data.apellido}`)
      return data
    });
};

const getMyProducts = async () => {
  const {
    token,
  } = getUserData();
  return await apiAxios.get(`/product/my_products`,
    {
      headers: {
        token,
      },
    }).then(({ data: { productos } }) => {
      return productos
    });
};

const postProducts = async ({
  titulo,
  descripcion,
  tipo_trato,
  cantidad,
  foto
}) => {
  const {
    token
  } = getUserData();
  return await apiAxios.post('/product', {
    titulo,
    descripcion,
    tipo_trato,
    cantidad,
    foto
  }, {
    headers: {
      token
    }
  }).then(({ data }) => {
    return data
  })
}


export {
  login,
  getProducts,
  getUsersById,
  getProductsbyId,
  getMyProducts,
  postProducts,
  register
};
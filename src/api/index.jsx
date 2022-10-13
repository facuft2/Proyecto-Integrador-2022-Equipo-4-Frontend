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

const getProducts = () => {
  const { token } = getUserData();
  return apiAxios.get('/product/categories',
    {
      headers: {
        token,
      },
    }).then(({ data }) => data);
};

const getProductsbyId = ({ id }) => {
  const { token } = getUserData();
  return apiAxios.get(`/product?id=${id}`,
    {
      headers: {
        token,
      },
    }).then(({ data }) => data);
};

const getUsersById = ({ id }) => {
  const {
    token,
  } = getUserData();
  return apiAxios.get(`/users/${id}`,
    {
      headers: {
        token,
      },
    }).then(({ data }) => {
      return data
    });
};

const getMyProducts = () => {
  const {
    token,
  } = getUserData();
  return apiAxios.get(`/product/my_products`,
    {
      headers: {
        token,
      },
    }).then(({ data: { productos } }) => {
      return productos
    });
};

const postProducts = ({
  titulo,
  descripcion,
  tipo_trato,
  cantidad,
  foto,
  categorias
}) => {
  const {
    token
  } = getUserData();
  return apiAxios.post('/product', {
    titulo,
    descripcion,
    tipo_trato,
    cantidad,
    foto,
    categorias,
  }, {
    headers: {
      token
    }
  }).then(({ data }) => {
    return data
  })
}

const getCategories = () => {
  const { token } = getUserData();
  return apiAxios.get('/category',
    {
      headers: {
        token,
      },
    }).then(({ data }) => data);
};

const postExchange = ({idO, idR, message}) => {
  const { token } = getUserData();
  return apiAxios.post(`/exchange/${idR}/${idO}`, 
  {
    mensaje: message
  },
  {
    headers: {
      token,
    },
  }).then(({data}) => data);
}

const getExchangeByParams = (sended) => {
  const { token } = getUserData();
  const exchange = sended ? "enviado" : "recibido";
  return apiAxios.get(`/exchange?exchangeType=${exchange}`, {
    headers: {
      token,
    }
  }).then(({data}) => data)
}

const getExchangeById = (id) => {
  const { token } = getUserData();
  return apiAxios.get(`/exchange/${id}`, {
    headers: {
      token,
    }
  }).then(({data}) => data)
}


export {
  login,
  getProducts,
  getUsersById,
  getCategories,
  getProductsbyId,
  getMyProducts,
  postProducts,
  postExchange,
  register,
  getExchangeByParams,
  getExchangeById,
};
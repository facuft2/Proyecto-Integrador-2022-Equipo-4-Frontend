import React, { useEffect, useState } from "react";
import { ReactComponent as List } from "../../assets/list.svg";
import { ReactComponent as Search } from "../../assets/search.svg";
import { Icon } from "@iconify/react";
import fakeData from "../../constants/index";
import "./index.css";

function Home() {
  // console.log(fakeData);
  const [type, setType] = useState([]);
  const [showSideBar, setShowSideBar] = useState(false);

  useEffect(() => {
    setType(Array.from(new Set(fakeData.map(({ tipo }) => tipo))));
  }, []);

  const productsCategory = type.map((type) =>
    fakeData.filter((prod) => prod.tipo === type)
  );

  // console.log(productsCategory.map())

  // console.log(type);

  return (
    <div className="home">
      {showSideBar && (
        <div
          className="side-bar-container"
        >
          <div className="side-bar">
            <div>
              <div className="side-bar__top">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Agust%C3%ADncasanova_%28cropped%29.jpg"
                  alt="profile"
                  className="side-bar__top-image"
                />
                <span className="side-bar__top-text">Agustin Casanova</span>
              </div>
              <div className="side-bar__options">
                <div className="options">
                  <Icon icon="ant-design:home-outlined" height="15" />
                  <span classname="options-text"> Inicio </span>
                </div>
                <div className="options">
                  <Icon icon="ant-design:user-outlined" height="15" />
                  <span classname="options-text"> Perfil </span>
                </div>
                <div className="options">
                  <Icon icon="ic:outline-inventory-2" height="15" />
                  <span classname="options-text"> Mi inventario </span>
                </div>
              </div>
            </div>
            <div className="side-bar-space">
              <div className="side-bar-logout">
                <span className="side-bar-logout-text">Cerrar sesion</span>
                <Icon
                  icon="bx:log-out"
                  className="side-bar-logout-icon"
                  height="24"
                />
              </div>
            </div>
          </div>
          <div className="side-bar-outside" onClick={() => {setShowSideBar(false)}}></div>
        </div>
      )}
      <div className="home__header">
        <span
          className="home__header-list"
          onClick={() => {
            setShowSideBar(true);
          }}
        >
          <List />
        </span>
        <div className="home__header-search-bar">
          <Search className="search-icon" />
          <input className="search-bar-input"></input>
        </div>
      </div>
      <div className="home__body" >
        {productsCategory.map((category) => (
          <>
            <div className="category-box">
              <span className="category-title">{category[0].tipo}</span>
              <div className="card-box">
                {category.map((card) => (
                  <div className="home__body-card">
                    <img
                      className="home__body-card-image"
                      alt="card"
                      src="https://images-ti-vm1.tiendainglesa.com.uy/medium/P461723-1.jpg?20210720130231,Mesa-de-Ping-Pong-en-Tienda-Inglesa"
                    />
                    <div className="home__body-card-info">
                      <div className="home__body-card-title">
                        <span> {card.title} </span>
                      </div>
                      <div className="home__body-card-type">
                        <span>
                          tipo: {card.trueque ? "trueque" : "intercambio"}{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default Home;

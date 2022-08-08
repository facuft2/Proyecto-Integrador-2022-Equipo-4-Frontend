import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Header from '../../components/Header/Header'
import { useNavigate } from "react-router-dom";
import fakeData from "../../constants/index";
import "./index.scss";


function Home() {
  const navigate =  useNavigate();
  const [type, setType] = useState([]);
  const [showSideBar, setShowSideBar] = useState(false);

  useEffect(() => {
    setType(Array.from(new Set(fakeData.map(({ tipo }) => tipo))));
  }, []);

  const productsCategory = type.map((type) =>
    fakeData.filter((prod) => prod.tipo === type)
  );

  return (
    <div className="home">
      <div className="home__body" >
        <Header showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
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

import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Object from "../../components/Object";
import { useNavigate } from "react-router-dom";
import { fakeData } from "../../constants/index";
import "./index.scss";

const fs = require("fs");

function Home() {
  const navigate = useNavigate();
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
      <div className="home__body">
        <Header showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
        {productsCategory.map((category) => (
          <>
            <div className="category-box">
              <div className="category-box__head">
                <span className="category-title">{category[0].tipo}</span>
                <span className="category-see-all">Ver todo</span>
              </div>
              <div className="card-box">
                {category.map((card) => (
                  <Object image={card.image} id={card.id} title={card.title} trueque={card.trueque} />
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

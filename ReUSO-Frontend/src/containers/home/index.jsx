import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { AddItemButton } from "../../components/AddItemButton";
import { Category } from "../../components/Category";
import { getProducts } from "../../api";
import "./index.scss";

function Home() {
  const [showSideBar, setShowSideBar] = useState(false);
  const [products, setProducts] = useState()
  
  const data = async () => {
    setProducts(await getProducts())
  }

  useEffect(() => {
    data()
  }, [])

  return (
    <div className="home">
      <div className="home__body">
        <Header showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
        {products?.Productos?.map((data) => (
          <>
            <div className="category-box">
              <div className="category-box__head">
                <span className="category-title">{data.categoria}</span>
                <span className="category-see-all">Ver todo</span>
              </div>
              <Category data={data} />
            </div>
          </>
        ))}
        <AddItemButton />
      </div>
    </div>
  );
}

export default Home;

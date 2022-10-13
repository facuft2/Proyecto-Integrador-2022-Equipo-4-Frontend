import React, { useState, useEffect } from "react";
import './index.scss';
import { getMyProducts, getProductsbyId } from "../../api";
import { ReactComponent as Cross } from "../../assets/iconsInUse/icons8-close.svg";

import Object from "../Object";


export const InventoryModal = ({ setProduct, setModal }) => {
  const [products, setProducts] = useState()
  const id = localStorage.getItem('id')
  async function getProducts() {
    setProducts(await getMyProducts({ id }))
  }

  async function setMyProduct(id) {
    const { product } = await getProductsbyId({ id })

    setProduct(product)
    setModal(false)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className="inventory-modal">
      <div className="inventory-modal__box">
        {products?.length > 0 ? (
          <div className="inventory-modal__box-products">
            {products?.map((card) => (
              <div className="inventory-modal__box-item" onClick={() => setMyProduct(card.id)}>
                <Object
                  foto={card?.foto}
                  id={card?.id}
                  title={card?.titulo}
                  trueque={card?.trueque === "INTERCAMBIO" ? true : false}
                  available={false}
                />
              </div>
            ))}
          </div>
        ) : 
          <div className="inventory-modal__box-products-empty"> No tienes productos, ¡sube uno! </div>
        }
        <Cross className="inventory-modal__box-close" height="240px" onClick={() => setModal(false)} />
      </div>
    </div>
  )
}


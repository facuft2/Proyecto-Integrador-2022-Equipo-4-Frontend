import React from "react";
import { useNavigate } from "react-router-dom";
import './index.scss';

export const AddItemButton = () => {
    const navigate = useNavigate()
    return (
        <button className="add-item-button" onClick={() => navigate('/addItem', { replace: false })}> + Producto </button>
    )
}
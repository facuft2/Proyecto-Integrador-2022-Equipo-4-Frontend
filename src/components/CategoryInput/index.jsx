import React from "react";
import './index.scss';

const CategorySelected = ({name, removeCategory}) => (
    <div className="category-selected">
        <span className="category-selected__name">{name}</span>
        <div className="category-selected__close" onClick={removeCategory}>x</div>
    </div>
)

export default CategorySelected;

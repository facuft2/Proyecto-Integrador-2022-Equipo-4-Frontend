import React from "react";

import { ReactComponent as List } from "../../assets/list.svg";
import { ReactComponent as Search } from "../../assets/search.svg";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

import './index.css';

const Header = ({ showSideBar, setShowSideBar }) => {
  const navigate = useNavigate();

  return (
    <>
      {showSideBar && (
        <div className="side-bar-container">
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
                <span
                  className="side-bar-logout-text"
                  onClick={() => navigate("/signIn", { replace: true })}
                >
                  Cerrar sesion
                </span>
                <Icon
                  icon="bx:log-out"
                  className="side-bar-logout-icon"
                  height="24"
                />
              </div>
            </div>
          </div>
          <div
            className="side-bar-outside"
            onClick={() => {
              setShowSideBar(false);
            }}
          ></div>
        </div>
      )}
      <div className="header">
        <span
          className="header-list"
          onClick={() => {
            setShowSideBar(true);
          }}
        >
          <List />
        </span>
        <div className="header-search-bar">
          <Search className="search-icon" />
          <input className="search-bar-input"></input>
        </div>
      </div>
    </>
  );
};

export default Header;

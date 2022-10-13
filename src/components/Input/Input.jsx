import React from "react"

import './input.scss'

export const Input = ({ label, name, type, children, onChange, error }) => {
  return (
    <>
      <div className={`input-w-icon ${error ? "blink" : ""}`}>
        {children}
        <input
          className="register__input"
          placeholder={label}
          type={type}
          name={name}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <span className="register-error">{error}</span>
    </>
  )
}

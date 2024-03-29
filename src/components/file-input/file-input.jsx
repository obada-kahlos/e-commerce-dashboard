import PropTypes from "prop-types";
import React from "react";

export const FileInput = ({
  type,
  label,
  name,
  className,
  onChange,
  icon,
  rounded,
  id,
  accept,
}) => {
  const direction = window.localStorage.getItem("direction") || "ltr";

  return (
    <React.Fragment>
      <label htmlFor={id} className="wrapper-label">
        <input
          type={type}
          className={className}
          placeholder=" "
          name={name}
          autoComplete="off"
          onChange={onChange}
          id={id}
          accept={accept}
          hidden
        />

        <span className={`${direction === "ltr" ? "label-en" : "label-ar"}`}>
          {label}
        </span>

        <span
          className={`${direction === "ltr" ? "input-icon-en" : "input-icon-ar"
            }`}
        >
          {icon}
        </span>
      </label>
      <style>
        {`
          label.wrapper-label {
            position: relative;
            width: 100%;
            height: 50px;
            display: block;
            background-color : #E8EAEC;
            border-radius: ${rounded};
          }
          span.label-en {
            position: absolute;
            top: 50%;
            left: 15px;
            color: #484848;
            transform: translateY(-50%);
            transition: 0.1s;
            font-size: 12px;
            z-index : 1;
          }
          span.label-ar {
            position: absolute;
            top: 50%;
            right: 15px;
            color: #484848;
            transform: translateY(-50%);
            transition: 0.1s;
            font-size: 12px;
            z-index : 1;
          }
          input.${className} {
            position: relative;
            color : #484848;
            font-size : 12px;
            padding : 0px 16px;
            background-color : transparent;
            width : 100%;
            height : 100%;
            outline: none;
            border: none;
            z-index : 2;
          }
          span.input-icon-ar{
            position  : absolute;
            top : 50%;
            left : 16px;
            transform : translateY(-50%);
            color :  #000;
            cursor : pointer;
            z-index : 3;
          }
          span.input-icon-en{
            position : absolute;
            top : 50%;
            right : 16px;
            transform : translateY(-50%);
            color :  #000;
            cursor : pointer;
            z-index : 3;
          }
        `}
      </style>
    </React.Fragment>
  );
};

FileInput.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  rounded: PropTypes.string,
  id: PropTypes.string,
  accept: PropTypes.string,
  icon: PropTypes.element,
  passwordIcon: PropTypes.element,
  onChange: PropTypes.func,
};

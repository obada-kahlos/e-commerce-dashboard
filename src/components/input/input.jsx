import PropTypes from "prop-types";
import React from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

export const Input = ({
  type,
  label,
  name,
  className,
  onChange,
  icon,
  rounded,
  onClick,
  toggleIcon,
}) => {
  const direction = window.localStorage.getItem("direction") || "ltr";

  return (
    <React.Fragment>
      <div className="wrapper-div">
        <input
          type={type}
          className={className}
          placeholder=" "
          name={name}
          autoComplete="off"
          onChange={onChange}
        />

        <label className={`${direction === "ltr" ? "label-en" : "label-ar"}`}>
          {label}
        </label>

        {name === "password" || name === "confirmPassword" ? (
          <span
            onClick={onClick}
            className={`${direction === "ltr" ? "input-icon-en" : "input-icon-ar"
              }`}
          >
            {toggleIcon === false ? (
              <AiOutlineEye />
            ) : (
              <AiOutlineEyeInvisible />
            )}
          </span>
        ) : (
          <span
            className={`${direction === "ltr" ? "input-icon-en" : "input-icon-ar"
              }`}
          >
            {icon}
          </span>
        )}
      </div>
      <style>
        {`
          div.wrapper-div {
            position: relative;
            width: 100%;
            height: 50px;
            background-color : #E8EAEC;
            border-radius: ${rounded};
          }
          label.label-en {
            position: absolute;
            top: 50%;
            left: 15px;
            color: #484848;
            transform: translateY(-50%);
            transition: 0.1s;
            font-size: 12px;
            z-index : 1;
          }
          label.label-ar {
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
          input.${className}:not(:placeholder-shown) + label.label-en,
          input.${className}:focus + label.label-en {
            top: 30%;
            transform: translateY(-80%);
            color: #484848;
            font-size: 10px;
          }
          input.${className}:not(:placeholder-shown) + label.label-ar,
          input.${className}:focus + label.label-ar {
            top: 30%;
            transform: translateY(-80%);
            color: #484848;
            font-size: 10px;
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

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  rounded: PropTypes.string,
  icon: PropTypes.element,
  passwordIcon: PropTypes.element,
  onChange: PropTypes.func,
  toggleIcon: PropTypes.bool,
  onClick: PropTypes.func,
};

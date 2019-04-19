import React from "react";
import hearts from "../imgs/hearts.svg";
import PropTypes from "prop-types";

const Heart = ({ onClick, name, color, size }) => (
  <svg onClick={onClick} fill={color} width={size} height={size}>
    <use xlinkHref={`${hearts}#heart-${name}`} />
  </svg>
);

Heart.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number
};

export default Heart;

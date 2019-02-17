import React from 'react';
import './index.css';

function Button(props) {

  return (
    <div>
      <button
        className='button'
        onClick={props.onClick}>
        {props.text}
      </button>
    </div>
  );
}

export default Button;
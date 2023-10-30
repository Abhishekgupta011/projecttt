import React from "react";

const CartItem = (props) => {

  return (
    <li className="cartItem">
      <div>
        <h3 className="name">{props.mName}</h3>
        <div className="itemCount">
          <span className="price">{props.price}</span>
          <span className="amount">x {props.amount}</span>
        </div>
      </div>
      <div className="buttons">
        <button onClick={props.onAdd} className="adds">+</button>
        <button onClick={props.onRemove} className="remove">-</button>
        <button onClick={props.onDelete} className="delete">Delete</button>
      </div>
      
    </li>
  );
};

export default CartItem;
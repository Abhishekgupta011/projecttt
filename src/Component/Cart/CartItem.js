import React from "react";

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className="cartItem">
      <div>
        <h3 className="name">{props.name}</h3>
        <div className="itemCount">
          <span className="price">{price}</span>
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
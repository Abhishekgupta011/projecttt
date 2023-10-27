import React, { useState, useRef } from 'react';

const ListProduct = (props) => {
  const amountInputRef = useRef();
  const [amountIsValid, setAmountIsValid] = useState(true);

  const submitHandler = (event, enteredAmountNumber) => {
    event.preventDefault();

    if (enteredAmountNumber < 1 || enteredAmountNumber > 5) {
      setAmountIsValid(false);
      setTimeout(() => {
        setAmountIsValid(true);
      }, 3000);
      return;
    }
    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <div>
      <ul>
        {props.products.map((product, index) => (
          <div key={index}>
            <li>
              <strong>Medicine Name:</strong> {product.mName}
            </li>
            <li>
              <strong>Description:</strong> {product.description}
            </li>
            <li>
              <strong>Price:</strong> {product.price}
            </li>
            <li>
              <strong>Quantity:</strong> {product.quantity}
            </li>
            <form onSubmit={(event) => submitHandler(event, +amountInputRef.current.value)}>
              <input type="number" ref={amountInputRef} />
              <button type="submit">Add to Cart</button>
            </form>
            {!amountIsValid && <p>Amount is not valid (should be between 1 and 5).</p>}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ListProduct;

import React, { useEffect } from 'react';

const ListProduct = (props) => {
 const crudUrl = "https://crudcrud.com/api/eb9094b2385b4726bd008e8bc2787fca"
  const submitHandler = async (event, product) => {
    event.preventDefault();
    try {
      const response = await fetch(`${crudUrl}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error('Failed to add product.');
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
    props.onAddToCart(product);
    console.log(product)
  };
  
  return (
    <div>
      <ul>
        {props.products.map((product) => (
          <div key={product.id}>
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
            <button
              type="submit"
              onClick={(event) => submitHandler(event, product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ListProduct;

import React, { useState } from 'react';
import ListProduct from '../ListProduct/ListProduct';

const Layout = () => {
  const [mName, setMname] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [products, setProducts] = useState([]); // State to store the list of products

  const medicineNameHandler = (event) => {
    setMname(event.target.value);
  };

  const descriptionHandler = (event) => {
    setDescription(event.target.value);
  };

  const priceHandler = (event) => {
    setPrice(event.target.value);
  };

  const quantityHandler = (event) => {
    setQuantity(event.target.value);
  };

  const addMedicineHandler = (event) => {
    event.preventDefault()
    const product = {
      mName,
      description,
      price,
      quantity,
    };
    // Add the new product to the list of products
    setProducts([...products, product]);

  };
  return (
    <div>
    <form onSubmit={addMedicineHandler}>
      <label htmlFor='mname'>Medicine Name</label>
      <input type='text' id='mname' value={mName} onChange={medicineNameHandler} />
      <label htmlFor='description'>Description</label>
      <input type='text' id='description' value={description} onChange={descriptionHandler} />
      <label htmlFor='price'>Price</label>
      <input type='text' id='price' value={price} onChange={priceHandler} />
      <label htmlFor='quantity'>Quantity</label>
      <input type='text' id='quantity' value={quantity} onChange={quantityHandler} />
      <button type='submit'>Add Medicine</button>
    </form>
    <ListProduct products={products}/>
    </div>
  );
};

export default Layout;

import React, { useContext, useState } from 'react';
import ListProduct from '../ListProduct/ListProduct';
import CartContext from '../Context/CartContext';

const Layout = () => {
  const cartCtx = useContext(CartContext);

  const [mName, setMname] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [products, setProducts] = useState([]);
  const [nextId, setNextId] = useState(1); // Initialize the ID counter

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
    event.preventDefault();

    const product = {
      id: nextId, // Assign a unique ID
      mName,
      description,
      price: +price,
      quantity: +quantity,
      amount: 1,
    };

    // Add the new product to the list of products
    setProducts([...products, product]);
    setNextId(nextId+1)
    setMname('');
    setDescription('');
    setPrice('');
    setQuantity('');
  };

  const onAddToCartHandler = (product) => {
    setNextId(nextId + 1)
    if (product.quantity > 0) {
      const updatedProducts = [...products];
      const productIndex = updatedProducts.findIndex((p) => p.id === product.id);

      if (productIndex !== -1) {
        updatedProducts[productIndex] = {
          ...product,
          quantity: product.quantity - 1,
        };
        setProducts(updatedProducts);
      }
    }
    
    // Add the product to the cart
    cartCtx.addItem(product);
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
      <ListProduct products={products} onAddToCart={onAddToCartHandler} />
    </div>
  );
};

export default Layout;

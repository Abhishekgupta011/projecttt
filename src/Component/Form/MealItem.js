import React, { useContext } from "react";
import './MealItem.css'
import CartContext from "../Context/CartContext";
import ListProduct from "../ListProduct/ListProduct";

const MealItem = (props) => {
    const cartCtx = useContext(CartContext);
    const formattedPrice = typeof props.price === 'number' ? `$${props.price.toFixed(2)}` : 'Invalid Price';

    const onAddToCartHandler = (amount) => {
        const product = {
            id: props.id,
            mName: props.name,
            description: props.description,
            price: props.price,
            quantity: amount,
          };
          cartCtx.addItem(product);
        };

    return (
        <div className="form">
            <li key={props.id}>
                <div className="list-items">
                    <div className="meal-info">
                        <span className="meal-name">{props.name}</span>
                        <br />
                        <span className="meal-description">{props.description}</span><br/>
                        <span className='meal-price'>{formattedPrice}</span>
                    </div>
                    <ListProduct  products={[]} onAddToCart={onAddToCartHandler} />
                </div>
            </li>
        </div>
    )
}

export default MealItem;

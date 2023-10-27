import React, { useContext } from "react";
import CartContext from "../Context/CartContext";

const Navbar = (props)=>{
    const cartctx = useContext(CartContext)

   const numberOfItemsInCart = cartctx.items.reduce((current , items) => {
    return current + items.amount;
   } , 0)
    return(
        <nav>
            <button onClick={props.onShowCart}>Cart<sup>{numberOfItemsInCart}</sup></button>

        </nav>
    )
}

export default Navbar;
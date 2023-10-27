import { useState } from "react";
import Layout from "./Component/Layout/Layout";
import Navbar from "./Component/Navbar/Navbar";
import Cart from "./Component/Cart/Cart";
import CartProvider from "./Component/Context/CartProvider";

function App() {
  const  [cartVisible, setCartVisible] = useState(false)

  const showCart = () =>{
    setCartVisible(true)
  }

  const HideCart = () => {
    setCartVisible(false)
  }
  return (
    <CartProvider>
     <Navbar  onShowCart={showCart}/>
     {cartVisible && <Cart onClose = {HideCart}/>}
        <Layout/>
    </CartProvider>
  );
}

export default App;

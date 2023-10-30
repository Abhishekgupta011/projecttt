import { useReducer  , useEffect} from "react";
import CartContext from "./CartContext";

const defaultCartState = {
  products: [],
  totalAmount: 0,
};
const  crudUrl = "https://crudcrud.com/api/eb9094b2385b4726bd008e8bc2787fca"
const cartReducer = (state, action) => {
  if(action.type==="INITIALCART"){

      let totalAmount = 0;
      totalAmount = action.products.reduce((acc, item) => acc+item.price*item.quantity,0);
  
      console.log('totalamount',totalAmount);
      return {
          products: action.products,
          totalAmount : totalAmount,
  
      }
  }
  if (action.type === "ADD") {
    
    const existingCartItemIndex = state.products.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.products[existingCartItemIndex];
  
    const updatedTotalAmount = state.totalAmount + action.item.price*action.item.amount ;
  
    let updatedItems;
  
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.products];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.products.concat({...action.item,
        amount: action.item.amount,
      });
    }
  
    return {
      ...state,
      products: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.products.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.products.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount - 1,
      };
      updatedItems = [...state.products];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      products: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === 'DELETE') {
    const existingCartItemIndex = state.products.findIndex(
      (item) => item.id === action.id
    );
  
    if (existingCartItemIndex === -1) {
      // Item not found, return the current state
      return state;
    }
  
    const existingItem = state.products[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price * existingItem.amount;
  
    // Remove the item from the array
    const updatedItems = state.products.filter((item) => item.id !== action.id);
  
    return {
      products: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  
  return defaultCartState;
}

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
  useEffect(() => {
    // This code will be executed when the component is initially mounted (page is refreshed)
    const getProducts = async () => {
      try {
        const response = await fetch(`${crudUrl}/cart`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch products.');
        }
        const products = await response.json();
        console.log('Products:', products);
        if(products){
          dispatchCartAction({ type: "INITIALCART", products: products })
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    getProducts(); // Make the initial GET request on page refresh
  }, []);
  const addItemHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const deleteItemsHandler  = (id) =>{
    dispatchCartAction({type: 'DELETE' , id:id})
  }
 
  const cartContext = {
    products: cartState.products,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    deleteItem: deleteItemsHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
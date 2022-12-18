import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

type MyContextType = {
  showCart: boolean;
  cartItems: any[];
  totalPrice: number;
  totalQuantities: number;
  qty: number;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
  onAdd: any;
  setShowCart: (show: boolean) => void;
  toggleCartItemQuantity: (id: string, value: string) => void;
};

const MyContext = createContext<MyContextType>({
  showCart: false,
  setShowCart: () => console.log("add to cart"),
  cartItems: [],
  totalPrice: 0,
  totalQuantities: 0,
  qty: 1,
  increaseQuantity: () => console.log("increased quantity"),
  decreaseQuantity: () => console.log("decreased quantity"),
  onAdd: () => console.log("added to the cart"),
  toggleCartItemQuantity: () => console.log("toggleCartItemQuantity"),
});

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    const checkProductInCar = cartItems.find((item) => item._id === product._id);
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCar) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to the cart`);
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    //we splice to remove the old added product to cart
    //we are doing wrong splice method is mutated method which means we are updating the state
    // const newCartItems = cartItems.splice(index, 1);
    // using non-mutated method will fix this issue
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === "increment") {
      // Here we update the newCartItems array with the new product quantity at the correct index before updating the state with the new array
      foundProduct = { ...foundProduct, quantity: foundProduct.quantity + 1 };

      newCartItems.splice(index, 0, foundProduct);

      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
      setCartItems(newCartItems);
    } else if (value === "decrement") {
      if (foundProduct.quantity > 1) {
        setCartItems(
          cartItems.map((item, i) =>
            i === index ? { ...foundProduct, quantity: foundProduct.quantity - 1 } : item
          )
        );
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };
  const increaseQuantity = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decreaseQuantity = () => {
    setQty((prevQty) => (prevQty - 1 < 1 ? 1 : prevQty - 1));
    // setQty((prevQty) => {
    //   if (prevQty - 1 < 1) return 1;
    //   return prevQty - 1;
    // });
  };
  return (
    <MyContext.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        increaseQuantity,
        decreaseQuantity,
        onAdd,
        toggleCartItemQuantity,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyStateContext = () => useContext(MyContext);

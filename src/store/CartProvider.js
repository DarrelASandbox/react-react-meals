import React, { useReducer } from 'react';

const CartContext = React.createContext({
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  addCartItemHandler: (item) => {},
  removeCartItemHandler: (id) => {},
});

const defaultCartState = {
  items: [],
  totalQuantity: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CART_ITEM':
      const updatedItems = state.items.concat(action.item); // concat returns new array
      const updatedTotalPrice =
        state.totalPrice + action.item.price * action.item.totalQuantity;

      return { items: updatedItems, totalPrice: updatedTotalPrice };

    case 'REMOVE_CART_ITEM':
      return;

    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addCartItemHandler = (item) =>
    dispatchCartAction({ type: 'ADD_CART_ITEM', item });

  const removeCartItemHandler = (id) =>
    dispatchCartAction({ type: 'REMOVE_CART_ITEM', id });

  const cartContext = {
    items: cartState.items,
    totalQuantity: cartState.totalQuantity,
    totalPrice: cartState.totalPrice,
    addCartItemHandler,
    removeCartItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export { CartContext as default, CartProvider };

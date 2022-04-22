import React, { useReducer } from 'react';

const CartContext = React.createContext({
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  addCartItem: (item) => {},
  removeCartItem: (id) => {},
});

const defaultCartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CART_ITEM': {
      const updatedState = { ...state };
      const existingItemIndex = updatedState.items.findIndex(
        (item) => item.id === action.item.id
      );

      existingItemIndex >= 0
        ? (updatedState.items[existingItemIndex].quantity +=
            action.item.quantity)
        : updatedState.items.push(action.item);

      updatedState.totalPrice += action.item.quantity * action.item.price;
      return updatedState;
    }

    case 'REMOVE_CART_ITEM': {
      let updatedState = { ...state };
      const existingItemIndex = updatedState.items.findIndex(
        (item) => item.id === action.id
      );

      updatedState.totalPrice -= updatedState.items[existingItemIndex].price;

      if (updatedState.items[existingItemIndex].quantity === 1) {
        updatedState.items = updatedState.items.filter(
          (item) => item.id !== action.id
        );
      } else updatedState.items[existingItemIndex].quantity -= 1;

      return updatedState;
    }

    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addCartItem = (item) =>
    dispatchCartAction({ type: 'ADD_CART_ITEM', item });

  const removeCartItem = (id) =>
    dispatchCartAction({ type: 'REMOVE_CART_ITEM', id });

  const cartContext = {
    items: cartState.items,
    totalQuantity: cartState.totalQuantity,
    totalPrice: cartState.totalPrice,
    addCartItem,
    removeCartItem,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export { CartContext as default, CartProvider };

## About The Project

- React - The Complete Guide (incl Hooks, React Router, Redux)
- Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!
- Tutorial for Basic age tracker
- [Maximilian Schwarzmüller](https://github.com/maxschwarzmueller)
- [Academind](https://academind.com/)

&nbsp;

## Notes

> <b>Sanghyuk: </b> Can you explain what .bind(null, item.id) is?

> <b>Jost: </b> We can't just write <code>onRemove={cartItemRemoveHandler(item.id)}</code>. Since this would call the function immediately (and not when the cart item is clicked).
>
> So, if we want to pass params, we can either use bind (the first param is not used here, so we can write anything in this place) <code>onRemove={cartItemRemoveHandler.bind(null, item.id)}</code>, or we can create an anonymous function: <code>onRemove={() => cartItemRemoveHandler(item.id)}</code>
>
> Both options are equivalent.

&nbsp;

---

&nbsp;

> <b>Original code from tutorial: </b>In <code>CartProvider.js</code> under <code>case 'ADD_CART_ITEM'</code>

```js
const updatedTotalPrice =
  state.totalPrice + action.item.price * action.item.quantity;

const existingCartItemIndex = state.items.findIndex(
  (item) => item.id === action.item.id
);

const existingCartItem = state.items[existingCartItemIndex];
let updatedItems;

if (existingCartItem) {
  const updatedItem = {
    ...existingCartItem,
    quantity: existingCartItem.quantity + action.item.quantity,
  };

  updatedItems = [...state.items];
  updatedItems[existingCartItemIndex] = updatedItem;
} else updatedItems = state.items.concat(action.item);

return { items: updatedItems, totalPrice: updatedTotalPrice };
```

> <b>Michael: </b>Different way to code the reducer using map

```js
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      let updatedItems;
      if (state.items.find((item) => item.id === action.payload.id)) {
        updatedItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, amount: item.amount + action.payload.amount }
            : item
        );
      } else {
        updatedItems = [...state.items, action.payload];
      }
      return {
        items: updatedItems,
        totalCost:
          state.totalCost + action.payload.price * action.payload.amount,
      };
    case 'REMOVE_ITEM':
      return state;
    default:
      return state;
  }
};
```

> <b>Dillon: </b>You are iterating over the items twice. Now your complexity is O(2n) whereas before it was O(n) to find and then O(1) to update. For every additional item in your list your solution takes twice as long as the original.

> <b>Bhalchandra: </b>

```js
if (action.type === 'ADD_ITEM') {
  const updatedState = { ...state };

  const itemIndex = updatedState.items.findIndex(
    (item) => item.id === action.item.id
  );

  if (itemIndex >= 0) {
    updatedState.items[itemIndex].amount += action.item.amount;
  } else {
    updatedState.items.push(action.item);
  }

  updatedState.cartTotalAmount += action.item.amount * action.item.price;

  return updatedState;
}
```

> <b>Miguel Fernando Avila: </b>

```js
const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const mergedItems = state.items.filter((item) => {
      return action.item.id !== item.id;
    });
    const updatedItems = mergedItems.concat(action.item);
    const updateTotalAmount = updatedItems.reduce((prevValue, item) => {
      return prevValue + item.amount * item.price;
    }, 0);
    console.log(updatedItems, updateTotalAmount);
    return {
      items: updatedItems,
      totalAmount: updateTotalAmount,
    };
  }
  return defaultCartState;
};
```

&nbsp;

---

&nbsp;

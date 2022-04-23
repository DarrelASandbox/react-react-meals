## About The Project

- React - The Complete Guide (incl Hooks, React Router, Redux)
- Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!
- Tutorial for React Meals
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

> <b>Hendry: </b> try catch in async declaration
> Can we not just use Try Catch inside the actual async function declaration, instead of when we call it, like in previous lectures? Is there a reason we wouldn't do that?

> <b>Ejin: </b> Hi Henry, you need to be careful when using try...catch in an async function. When using try...catch in an async function, the async function will return a fulfilled promise after running the catch block. Therefore, if you want to trigger the catch block in outer function calling the async function, you need to throw a new error under the catch block of the async funciton.

> <b>Shrey: </b>@Ejin But in this case, it should not matter because the whole purpose of running the catch block is to update the error state and re-render the component so that it shows error message (which is stored in our error state).

&nbsp;

---

&nbsp;

> <b>Christopher: </b>Is the throw new error necessary?

> <b>Jost: </b>Yes, that's necessary.
>
> With ... `https://${firebaseProject}.firebaseio.com/meals` ... (forgotten extension) the request as such is rejected, so that the code goes directly to the catch block. But if you try e.g. ... `https://${firebaseProject}.firebaseio.com/meals.foo` ... you will get a 404 response from Firebase.
>
> Since this response is not a valid JSON, you would get an ugly "Unexpected token o in JSON at position 1" message when omitting this check.

&nbsp;

---

&nbsp;

import { useContext, useState } from 'react';
import CartContext from '../../store/CartProvider';
import { Modal } from '../UI/';
import { CartItem, Checkout } from './';
import classes from './Cart.module.css';

const Cart = ({ onHideCart }) => {
  const cartContext = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const removeCartItemHandler = (id) => cartContext.removeCartItem(id);
  const addCartItemHandler = (item) =>
    cartContext.addCartItem({ ...item, quantity: 1 });

  const orderHandler = () => setIsCheckout(true);
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(`${process.env.REACT_APP_FIREBASE_URI}/orders.json`, {
      method: 'POST',
      body: JSON.stringify({ userData, orderedItems: cartContext.items }),
    });
    setIsSubmitting(false);
    setDidSubmit(true);
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartContext.items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onRemoveCartItem={removeCartItemHandler}
          onAddCartItem={addCartItemHandler}
        />
      ))}
    </ul>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = (
    <>
      <p>Successfully sent the order!</p>
      <button className={classes.button} onClick={onHideCart}>
        Close
      </button>
    </>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button-alt']} onClick={onHideCart}>
        Close
      </button>
      {cartContext.items.length > 0 && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Price</span>
        <span>{`$${Math.abs(cartContext.totalPrice).toFixed(2)}`}</span>
      </div>
      {isCheckout && (
        <Checkout onHideCart={onHideCart} onSubmitOrder={submitOrderHandler} />
      )}
      {!isCheckout && modalActions}
    </>
  );

  return (
    <Modal onHideCart={onHideCart}>
      <div>
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && isSubmittingModalContent}
        {!isSubmitting && didSubmit && didSubmitModalContent}
      </div>
    </Modal>
  );
};

export default Cart;

import { useContext, useState } from 'react';
import CartContext from '../../store/CartProvider';
import { Modal } from '../UI/';
import { CartItem, Checkout } from './';
import classes from './Cart.module.css';

const Cart = ({ onHideCart }) => {
  const cartContext = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);

  const removeCartItemHandler = (id) => cartContext.removeCartItem(id);
  const addCartItemHandler = (item) =>
    cartContext.addCartItem({ ...item, quantity: 1 });
  const orderHandler = (e) => setIsCheckout(true);

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

  return (
    <Modal onHideCart={onHideCart}>
      <div>
        {cartItems}
        <div className={classes.total}>
          <span>Total Price</span>
          <span>{`$${Math.abs(cartContext.totalPrice).toFixed(2)}`}</span>
        </div>

        {isCheckout && <Checkout onHideCart={onHideCart} />}
        {!isCheckout && modalActions}
      </div>
    </Modal>
  );
};

export default Cart;

import { useContext } from 'react';
import CartContext from '../../store/CartProvider';
import { Modal } from '../UI/';
import { CartItem } from './';
import classes from './Cart.module.css';

const Cart = ({ onHideCart }) => {
  const cartContext = useContext(CartContext);

  const removeCartItemHandler = (id) => cartContext.removeCartItem(id);

  const addCartItemHandler = (item) =>
    cartContext.addCartItem({ ...item, quantity: 1 });

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

  return (
    <Modal onHideCart={onHideCart}>
      <div>
        {cartItems}
        <div className={classes.total}>
          <span>Total Price</span>
          <span>{`$${Math.abs(cartContext.totalPrice).toFixed(2)}`}</span>
        </div>

        <div className={classes.actions}>
          <button className={classes['button-alt']} onClick={onHideCart}>
            Close
          </button>
          {cartContext.items.length > 0 && (
            <button className={classes.button}>Order</button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default Cart;

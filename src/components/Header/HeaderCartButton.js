import { useContext } from 'react';
import CartContext from '../../store/CartProvider';
import CartIcon from './CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = ({ onShowCart }) => {
  const cartContext = useContext(CartContext);

  const numberOfCartItems = cartContext.items.reduce(
    (currentNumber, item) => currentNumber + item.quantity,
    0
  );

  return (
    <button className={classes.button} onClick={onShowCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;

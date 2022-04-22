import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/CartProvider';
import CartIcon from './CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = ({ onShowCart }) => {
  const [bumpAnimation, setBumpAnimation] = useState(false);
  const cartContext = useContext(CartContext);
  const numberOfCartItems = cartContext.items.reduce(
    (currentNumber, item) => currentNumber + item.quantity,
    0
  );

  const btnClasses = `${classes.button} ${bumpAnimation ? classes.bump : ''}`;

  useEffect(() => {
    if (numberOfCartItems === 0) return;
    setBumpAnimation(true);
    const timer = setTimeout(() => setBumpAnimation(false), 300);
    return () => clearTimeout(timer); // clear timer before setting it again
  }, [numberOfCartItems]);

  return (
    <button className={btnClasses} onClick={onShowCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;

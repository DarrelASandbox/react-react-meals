import CartIcon from './CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = () => (
  <button className={classes.button}>
    <span className={classes.icon}>
      <CartIcon />
    </span>
    <span>Your Cart</span>
    <span className={classes.badge}>-9</span>
  </button>
);

export default HeaderCartButton;

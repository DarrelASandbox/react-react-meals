import classes from './CartItem.module.css';

const CartItem = ({ item, onRemoveCartItem, onAddCartItem }) => {
  const { id, name, price, quantity } = item;

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{`$${price.toFixed(2)}`}</span>
          <span className={classes.quantity}>x {quantity}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={() => onRemoveCartItem(id)}>&minus;</button>
        <button onClick={() => onAddCartItem(item)}>+</button>
      </div>
    </li>
  );
};

export default CartItem;

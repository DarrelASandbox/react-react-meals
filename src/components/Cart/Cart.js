import { Modal } from '../UI/';
import classes from './Cart.module.css';

const DUMMY_CART = [
  {
    id: 'c1',
    name: 'Sushi',
    quantity: 3,
    price: 22.99,
  },
  {
    id: 'c2',
    name: 'Schnitzel',
    quantity: 5,
    price: 16.5,
  },
  {
    id: 'c3',
    name: 'Barbecue Burger',
    quantity: 19,
    price: 12.99,
  },
  {
    id: 'c4',
    name: 'Green Bowl',
    quantity: 6,
    price: 18.99,
  },
];

const Cart = ({ onHideCart }) => {
  const cartItems = (
    <ul className={classes['cart-items']}>
      {DUMMY_CART.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );

  return (
    <Modal onHideCart={onHideCart}>
      <div>
        {cartItems}
        <div className={classes.total}>
          <span>Total Price</span>
          <span>1921742.2342</span>
        </div>

        <div className={classes.actions}>
          <button className={classes['button-alt']} onClick={onHideCart}>
            Close
          </button>
          <button className={classes.button}>Order</button>
        </div>
      </div>
    </Modal>
  );
};

export default Cart;

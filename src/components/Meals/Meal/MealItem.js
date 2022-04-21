import { useContext } from 'react';
import CartContext from '../../../store/CartProvider';
import { MealItemForm } from './';
import classes from './MealItem.module.css';

const MealItem = ({ meal }) => {
  const { id, name, description, price } = meal;
  const cartContext = useContext(CartContext);

  const addCartItemHandler = (quantity) =>
    cartContext.addCartItem({ id, name, quantity, price });

  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{price.toFixed(2)}</div>
      </div>

      <div>
        <MealItemForm id={id} onAddCartItem={addCartItemHandler} />
      </div>
    </li>
  );
};

export default MealItem;

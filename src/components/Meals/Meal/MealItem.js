import { MealItemForm } from './';
import classes from './MealItem.module.css';

const MealItem = ({ meal }) => {
  const { id, name, description, price } = meal;

  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{price.toFixed(2)}</div>
      </div>

      <div>
        <MealItemForm id={id} />
      </div>
    </li>
  );
};

export default MealItem;

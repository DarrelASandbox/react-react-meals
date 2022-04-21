import { useRef, useState } from 'react';
import { Input } from '../../UI/';
import classes from './MealItemForm.module.css';

const MealItemForm = ({ id, onAddCartItem }) => {
  const [quantityIsValid, setQuantityIsValid] = useState(true);
  const quantityInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const inputQuantity = +quantityInputRef.current.value.trim();
    if (inputQuantity < 1 || inputQuantity > 5) {
      setQuantityIsValid(false);
      return;
    }

    onAddCartItem(inputQuantity);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={quantityInputRef}
        label="Quantity"
        input={{
          id: 'quantity_' + id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>Add</button>
      {!quantityIsValid && <p>Please enter a valid quantity between 1 to 5.</p>}
    </form>
  );
};

export default MealItemForm;

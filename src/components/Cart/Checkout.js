import classes from './Checkout.module.css';
import { useRef, useState } from 'react';

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = ({ onHideCart }) => {
  // Refer to react-basic-react-form repo for a more elaborated form setup
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (e) => {
    e.preventDefault();

    const nameInput = nameInputRef.current.value;
    const streetInput = streetInputRef.current.value;
    const postalCodeInput = postalCodeInputRef.current.value;
    const cityInput = cityInputRef.current.value;

    const nameInputIsValid = !isEmpty(nameInput);
    const streetInputIsValid = !isEmpty(streetInput);
    const postalCodeInputIsValid = isFiveChars(postalCodeInput);
    const cityInputIsValid = !isEmpty(cityInput);

    setFormInputsValidity({
      name: nameInputIsValid,
      street: streetInputIsValid,
      postalCode: postalCodeInputIsValid,
      city: cityInputIsValid,
    });

    const formIsValid =
      nameInputIsValid &&
      streetInputIsValid &&
      postalCodeInputIsValid &&
      cityInputIsValid;

    if (!formIsValid) return;
  };

  const controlClasses = (formInputField) =>
    `${classes.control} ${
      formInputsValidity[formInputField] ? '' : classes.invalid
    }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={controlClasses('name')}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={controlClasses('street')}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={controlClasses('postalCode')}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputsValidity.postalCode && (
          <p>Please enter a valid postal code!</p>
        )}
      </div>
      <div className={controlClasses('city')}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={onHideCart}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;

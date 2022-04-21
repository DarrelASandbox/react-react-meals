import classes from './Input.module.css';

const Input = ({ label, input }) => (
  <div className={classes.input}>
    <label htmlFor={input.id}>{label}</label>
    <input {...input} />
  </div>
);

export default Input;

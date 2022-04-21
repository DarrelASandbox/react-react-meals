import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

const Backdrop = ({ onHideCart }) => (
  <div className={classes.backdrop} onClick={onHideCart}></div>
);

const ModalOverlay = ({ children }) => (
  <div className={classes.modal}>
    <div className={classes.content}>{children}</div>
  </div>
);

const portalElement = document.getElementById('overlays');

const Modal = ({ children, onHideCart }) => (
  <>
    {ReactDOM.createPortal(<Backdrop onHideCart={onHideCart} />, portalElement)}
    {ReactDOM.createPortal(
      <ModalOverlay>{children}</ModalOverlay>,
      portalElement
    )}
  </>
);

export default Modal;

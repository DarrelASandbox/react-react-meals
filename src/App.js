import { useState } from 'react';
import Cart from './components/Cart/Cart';
import Header from './components/Header/Header';
import { Meals } from './components/Meals';
import { CartProvider } from './store/CartProvider';

const App = () => {
  const [cartIsShown, setCartIsShown] = useState(false);

  const toggleCartHandler = () => setCartIsShown((prevState) => !prevState);

  return (
    <CartProvider>
      {cartIsShown && <Cart onHideCart={toggleCartHandler} />}
      <Header onShowCart={toggleCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
};

export default App;

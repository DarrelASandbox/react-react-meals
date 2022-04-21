import { useState } from 'react';
import Cart from './components/Cart/Cart';
import Header from './components/Header/Header';
import { Meals } from './components/Meals';

const App = () => {
  const [cartIsShown, setCartIsShown] = useState(false);

  const toggleCartHandler = () => setCartIsShown((prevState) => !prevState);

  return (
    <>
      {cartIsShown && <Cart onHideCart={toggleCartHandler} />}
      <Header onShowCart={toggleCartHandler} />
      <main>
        <Meals />
      </main>
    </>
  );
};

export default App;

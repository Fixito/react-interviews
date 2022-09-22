import { useState } from 'react';

const Counter = () => {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <h3>Compteur</h3>
      <p>{counter}</p>
      <button onClick={() => setCounter(counter + 1)}>Incrémenter</button>
    </>
  );
};

export default Counter;

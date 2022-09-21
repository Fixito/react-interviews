import { useState } from 'react';

const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <h1>Entretien React</h1>
      <h2>Compteur</h2>
      <p>{counter}</p>
      <button onClick={() => setCounter(counter + 1)}>Incrémeter</button>
    </>
  );
};

export default App;

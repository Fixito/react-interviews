import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const url = 'https://randomuser.me/api?page=';

const App = () => {
  const [counter, setCounter] = useState(0);
  const [user, setUser] = useState('');
  const [people, setPeople] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);

  const fetchRandomUser = useCallback(async () => {
    try {
      const {
        data: { results }
      } = await axios(`${url}${pageIndex}`);
      const user = results[0];
      setUser(user);
      setPeople((people) => [...people, user]);
    } catch (error) {
      console.log(error);
    }
  }, [pageIndex]);

  useEffect(() => {
    fetchRandomUser();
  }, [pageIndex, fetchRandomUser]);

  return (
    <>
      <h1>Entretien React</h1>
      <h2>Compteur</h2>
      <p>{counter}</p>
      <button onClick={() => setCounter(counter + 1)}>Incrémenter</button>
      <h2>API</h2>
      <pre>{user && JSON.stringify(user, null, 2)}</pre>
      {people.map((person, index) => {
        const {
          name: { first: name },
          picture: { thumbnail: img }
        } = person;

        return (
          <div key={index}>
            <img src={img} alt={name} />
            <p>{name}</p>
          </div>
        );
      })}
      <button onClick={() => setPageIndex(pageIndex + 1)}>
        Charger plus d'utilisateurs
      </button>
    </>
  );
};

export default App;

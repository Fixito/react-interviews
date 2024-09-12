import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const url = 'https://randomuser.me/api?page=';

const APIBasics = () => {
  // const [user, setUser] = useState('');
  const [people, setPeople] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchRandomUser = useCallback(async () => {
    setIsLoading(true);

    try {
      const {
        data: { results },
      } = await axios(`${url}${pageIndex}`);
      const user = results[0];
      setPeople((PrevPeople) => [...PrevPeople, user]);
      setIsError(false);
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [pageIndex]);

  useEffect(() => {
    fetchRandomUser();
  }, [fetchRandomUser]);

  return (
    <>
      <h3>API</h3>
      {/* <pre>{user && JSON.stringify(user, null, 2)}</pre> */}
      {isError && <p>Une erreur s&apos;est produite...</p>}
      {!isLoading ? (
        people.map((person) => {
          const {
            name: { first: name },
            picture: { thumbnail: img },
            login: { uuid },
          } = person;

          return (
            <div key={uuid}>
              <img src={img} alt={name} />
              <p>{name}</p>
            </div>
          );
        })
      ) : (
        <div>Chargement...</div>
      )}
      <button
        onClick={() => setPageIndex(pageIndex + 1)}
        disabled={isLoading}
      >
        Charger plus d&apos;utilisateurs
      </button>
    </>
  );
};

export default APIBasics;

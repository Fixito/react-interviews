import { useState, useEffect } from 'react';
import axios from 'axios';
import Counter from './beginner/Counter';
import APIBasics from './beginner/APIBasics';
import SearchForm from './intermediate/SearchForm';
import PeopleTable from './intermediate/PeopleTable';

const url = 'https://randomuser.me/api/?results=20';

const App = () => {
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [headers, setHeaders] = useState([]);
  const [input, setInput] = useState('');

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const {
        data: { results },
      } = await axios(url);
      const headers = Object.keys(results[0].location);
      const newResults = results.map((person) => {
        const {
          location: {
            city,
            country,
            postcode,
            state,
            street: { number, name },
            coordinates,
            timezone,
          },
        } = person;
        return {
          city,
          country,
          postcode,
          state,
          coordinates: `${coordinates.latitude}°N, ${coordinates.longitude}°E`,
          street: `${number} ${name}`,
          timezone,
        };
      });
      setHeaders(headers);
      setPeople(newResults);
      setIsError(false);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <h1>Entretien React</h1>
      <h2>Niveau Débutant</h2>
      <Counter />
      <APIBasics />
      <h2>Niveau Intermédiare</h2>
      <SearchForm people={people} input={input} setInput={setInput} />
      {isError && <p>Une erreur s&apos;est produite...</p>}
      {isLoading ? (
        <div>Chargement...</div>
      ) : (
        <PeopleTable
          people={people}
          setPeople={setPeople}
          headers={headers}
          input={input}
        />
      )}
    </main>
  );
};

export default App;

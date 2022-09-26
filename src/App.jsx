import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Counter from './beginner/Counter';
import APIBasics from './beginner/APIBasics';
import SearchForm from './intermediate/SearchForm';
import PeopleTable from './intermediate/PeopleTable';

const url = 'https://randomuser.me/api/?results=20';

const App = () => {
  const [people, setPeople] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [input, setInput] = useState('');

  const fetchData = async () => {
    try {
      const {
        data: { results }
      } = await axios(`${url}`);
      const headers = Object.keys(results[0].location);
      const newResults = results.map((person) => {
        const {
          city,
          country,
          postcode,
          state,
          coordinates: { latitude, longitude },
          timezone
        } = person.location;
        const { number, name } = person.location.street;

        return {
          city,
          country,
          postcode,
          state,
          coordinates: `${latitude}°N, ${longitude}°E`,
          street: `${number} ${name}`,
          timezone
        };
      });
      setHeaders(headers);
      setPeople(newResults);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>Entretien React</h1>
      <h2>Niveau Débutant</h2>
      <Counter />
      <APIBasics />
      <h2>Niveau Intermédiare</h2>
      <SearchForm people={people} input={input} setInput={setInput} />
      <PeopleTable
        people={people}
        setPeople={setPeople}
        headers={headers}
        input={input}
      />
    </>
  );
};

export default App;

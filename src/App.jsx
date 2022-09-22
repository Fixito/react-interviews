import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Counter from './beginner/Counter';
import APIBasics from './beginner/APIBasics';
import SearchForm from './intermediate/SearchForm';

const url = 'https://randomuser.me/api/?results=20';

const App = () => {
  const [people, setPeople] = useState([]);
  const [headers, setHeaders] = useState([]);

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

  const sortHeader = (header) => {
    const newPeople = [...people];

    newPeople.sort((a, b) => {
      const headerA = a[header];
      const headerB = b[header];

      return headerA < headerB ? -1 : headerA > headerB ? 1 : 0;
    });

    if (JSON.stringify(people) === JSON.stringify(newPeople)) {
      newPeople.sort((a, b) => {
        const headerA = a[header];
        const headerB = b[header];

        return headerA > headerB ? -1 : headerA < headerB ? 1 : 0;
      });
    }

    setPeople(newPeople);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>Entretien React</h1>
      {/* <h2>Niveau Débutant</h2> */}
      {/* <Counter />
      <APIBasics /> */}
      <h2>Niveau Intermédiare</h2>
      <SearchForm people={people} setPeople={setPeople} />
      <table border='1'>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} onClick={() => sortHeader(header)}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {people.map((person, index) => {
            return (
              <tr key={index}>
                {headers.map((header, i) => {
                  if (header === 'timezone') {
                    return <td key={i}>{person[header].description}</td>;
                  }

                  return <td key={i}>{person[header]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default App;

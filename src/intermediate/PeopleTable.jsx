import { useState } from 'react';

const PeopleTable = ({ setPeople, input, headers, people }) => {
  const [order, setOrder] = useState(null);

  const sortHeader = (header) => {
    const newPeople = [...people];

    newPeople.sort((a, b) => {
      const headerA = a[header];
      const headerB = b[header];

      return headerA < headerB ? -1 : headerA > headerB ? 1 : 0;
    });

    if (order === header) {
      newPeople.reverse();
      setOrder(null);
    } else {
      setOrder(header);
    }

    setPeople(newPeople);
  };

  const getFilteredRows = (rows, filterKey) => {
    return rows.filter((row) =>
      Object.values(row).some((s) => {
        return ('' + s)
          .toLowerCase()
          .includes(filterKey.toLowerCase());
      })
    );
  };

  return (
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
        {getFilteredRows(people, input).map((person, index) => {
          return (
            <tr key={index}>
              {headers.map((header, i) =>
                header === 'timezone' ? (
                  <td key={i}>{person[header].description}</td>
                ) : (
                  <td key={i}>{person[header]}</td>
                )
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PeopleTable;

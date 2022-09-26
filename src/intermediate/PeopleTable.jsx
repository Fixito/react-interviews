const PeopleTable = ({ setPeople, input, headers, people }) => {
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

  const getFilteredRows = (rows, filterKey) => {
    const filteredRows = rows.filter((row) =>
      Object.values(row).some((s) => {
        return ('' + s).toLowerCase().includes(filterKey);
      })
    );

    return filteredRows;
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
  );
};

export default PeopleTable;

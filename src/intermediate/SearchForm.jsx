const SearchForm = ({ input, setInput }) => {
  return (
    <form>
      <input
        type='text'
        placeholder='Rechercher...'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </form>
  );
};

export default SearchForm;

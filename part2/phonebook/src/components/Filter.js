const Filter = (props) => {
    const {search, handleChangeSearch} = props
  return (
    <>
      <h2>Phonebook</h2>
      <div>
        filter shown users with:{" "}
        <input value={search} onChange={handleChangeSearch} />
      </div>
    </>
  );
};
export default Filter

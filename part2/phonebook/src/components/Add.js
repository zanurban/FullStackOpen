const Add = (props) => {
  const {
    newName,
    handleInputChange,
    newNumber,
    handleInputChangeNumber,
    handleInput,
    


  } = props;
  return (
    <>
      <form  onSubmit={handleInput}>
        <h2>Add a new</h2>
        <div>
          name: <input value={newName} onChange={handleInputChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleInputChangeNumber} />
        </div>
        <div>
          <button type="submit">
            add
          </button>
        </div>
      </form>
    </>
  );
};
export default Add;

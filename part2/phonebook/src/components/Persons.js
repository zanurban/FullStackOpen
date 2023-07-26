const Persons = ({persons}) => {
    return(
        <>
        <h2>Numbers</h2>
        <table>
          <tbody>
          {persons.map((x)=><tr><td>{x.name}</td><td>{x.number}</td></tr>)}
          </tbody>
        </table>
        </>
    )
}
export default Persons
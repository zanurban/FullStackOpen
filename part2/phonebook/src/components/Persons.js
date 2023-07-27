import services from "../services/Services"
const Persons = ({persons, deletePerson}) => {

    return(
        <>
        <h2>Numbers</h2>
        <table>
          <tbody>
          {persons.map((x)=><tr><td>{x.name}</td><td>{x.number}</td><td><button value={x.id} onClick={() => deletePerson(x.id, x.name)}>delete</button></td></tr>)}
          </tbody>
        </table>
        </>
    )
}
export default Persons
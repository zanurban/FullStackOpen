const Header = (props) => {
  return (<h1>{props.course}</h1>)
}
const Part = (props) =>{
  return(
    <p>{props.name} {props.exercises}</p>
  )
}
const Content = (props) => {
  return (
    <p> {props.parts.map(element => (
      <Part name={element.name} exercises={element.exercises}/>)
    )}</p>
  )
}
const Total = (props) => {
  return (
    <p>Number of exercises {props.exercises[0] + props.exercises[1] + props.exercises[2]}</p>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts.map(x => x['exercises'])} />
    </div>
  )
}

export default App;

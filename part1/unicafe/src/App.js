import { useState } from "react";
const Button = ({ name, event }) => {
  return <button onClick={event}>{name}</button>;
};
const Counter = ({ name, count }) => {
  return (
    <tr>
      <td>
      {name}
      </td>
      <td>
      {count}
      </td>
    </tr>
       
  );
};
const Statistics = ({ object }) => {
  let good = object.good;
  let neutral = object.neutral;
  let bad = object.bad;
  let buttons = object.buttons;
  if (good != 0 || bad != 0 || neutral != 0) {
    return (
      <div>
        <table>
          <tbody>
          <Counter name={buttons.button1.name} count={good} />
        <Counter name={buttons.button2.name} count={neutral} />
        <Counter name={buttons.button3.name} count={bad} />
        <Counter name="all" count={good + neutral + bad} />
        <Counter name="average" count={(good - bad) / (good + neutral + bad)} />
        <Counter
          name="positive"
          count={(good / (good + neutral + bad)) * 100 + " %"}
        />
          </tbody>
        </table>
      </div>
    );
  } else {
    return <p>No feedback given</p>;
  }
};
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const buttons = {
    button1: { name: "good", event: () => setGood(good + 1) },
    button2: { name: "neutral", event: () => setNeutral(neutral + 1) },
    button3: { name: "bad", event: () => setBad(bad + 1) },
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button name={buttons.button1.name} event={buttons.button1.event} />
      <Button name={buttons.button2.name} event={buttons.button2.event} />
      <Button name={buttons.button3.name} event={buttons.button3.event} />
      <h2>Statistics</h2>

      <Statistics object={{ good, neutral, bad, buttons }} />
    </div>
  );
};

export default App;

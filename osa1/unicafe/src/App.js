import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const getAll = () => good + neutral + bad
  const getAverage = () => (good*1 + neutral*0 + bad*(-1)) / getAll()
  const getPositive = () => (good / getAll()) * 100

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h2>Statistics</h2>
      <p>good { good }</p>
      <p>neutral { neutral }</p>
      <p>bad { bad }</p>
      <p>all { getAll() }</p>
      <p>average { getAverage() }</p>
      <p>positive { getPositive() } %</p>
    </div>
  )
}

export default App

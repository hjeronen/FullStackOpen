const Header = ({ name }) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Part = ({ part }) => {
  return (
    <>
      <p>{part.name} {part.exercises}</p>
    </>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, i) =>
        <Part key={i} part={part} />
      )}
    </div>
  )
}

const Total = ({ parts }) => {
  const total = parts.map(part => part.exercises)
    .reduce((sum, item) => sum + item, 0)

  return (
    <div>
      <p>
        <strong>total of {total} exercises</strong>
      </p>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
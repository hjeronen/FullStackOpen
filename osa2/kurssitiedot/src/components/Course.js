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

// const Total = (props) => {
//   return (
//     <div>
//       <p>
//         Number of exercises {
//           props.parts[0].exercises
//           + props.parts[1].exercises
//           + props.parts[2].exercises
//         }
//       </p>
//     </div>
//   )
// }

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

export default Course
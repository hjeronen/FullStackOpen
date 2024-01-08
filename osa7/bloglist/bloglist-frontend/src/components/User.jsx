import { useParams } from 'react-router-dom'

const User = ({ users, blogs }) => {
  if (!users) {
    return null
  }

  if (!blogs) {
    return null
  }

  const id = useParams().id
  const user = users.find((user) => user.id === id)
  const addedBlogs = blogs.filter((blog) => blog.user.id === id)

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      {addedBlogs.length === 0 ? (
        <p>No added blogs.</p>
      ) : (
        <ul>
          {addedBlogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default User

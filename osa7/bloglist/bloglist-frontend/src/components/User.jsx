const User = ({ user, blogs }) => {
  if (!user) {
    return null
  }

  if (!blogs) {
    return null
  }

  const addedBlogs = blogs.filter((blog) => blog.user.id === user.id)

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

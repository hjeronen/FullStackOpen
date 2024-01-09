import { Card, ListGroup } from 'react-bootstrap'

const User = ({ user, blogs }) => {
  if (!user) {
    return null
  }

  if (!blogs) {
    return null
  }

  const addedBlogs = blogs.filter((blog) => blog.user.id === user.id)

  return (
    <div className='user'>
      <Card>
        <Card.Header as='h2'>{user.name}</Card.Header>
        <Card.Body>
          <Card.Title as='h5'>Added blogs:</Card.Title>
          <ListGroup>
            {addedBlogs.length === 0 ? (
              <ListGroup.Item>No added blogs.</ListGroup.Item>
            ) : (
              addedBlogs.map((blog) => (
                <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
              ))
            )}
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  )
}

export default User

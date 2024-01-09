import PropTypes from 'prop-types'
import { useState } from 'react'
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from 'react-bootstrap'

const Blog = ({ blog, updateBlog, deleteBlog, user, addComment }) => {
  const [comment, setComment] = useState('')

  if (!blog) {
    return null
  }

  const like = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    }

    updateBlog(updatedBlog, blog.user)
  }

  const postComment = async (event) => {
    event.preventDefault()

    const created = await addComment(blog, comment)
    if (created) setComment('')
  }

  return (
    <div className='blog'>
      <Card>
        <Card.Header as='h3'>{blog.title}</Card.Header>
        <ListGroup className='list-group-flush list-group'>
          <ListGroup.Item>
            <Card.Title as='h5'>by {blog.author}</Card.Title>
          </ListGroup.Item>
          <ListGroup.Item>
            <a href={blog.url}>{blog.url}</a>
          </ListGroup.Item>
          <ListGroup.Item>
            {blog.likes} likes
            <Button className='button-extra extra-space-left' onClick={like}>
              Like
            </Button>
          </ListGroup.Item>
          <ListGroup.Item>Added by {blog.user.name}</ListGroup.Item>
          {blog.user.username === user.username ? (
            <ListGroup.Item>
              <Button
                id='deleteButton'
                className='button-cancel'
                onClick={() => deleteBlog(blog)}
              >
                Delete
              </Button>
            </ListGroup.Item>
          ) : (
            <div></div>
          )}
        </ListGroup>
        <Card.Header as='h4' className='card-subtitle'>
          Comments
        </Card.Header>
        <Container className='content-container'>
          <Form onSubmit={postComment} className='form'>
            <Form.Group className='form-group'>
              <Form.Label>Add your comment:</Form.Label>
              <Form.Control
                type='text'
                value={comment}
                name='Comment'
                id='comment'
                onChange={({ target }) => setComment(target.value)}
              />
            </Form.Group>
            <Form.Group className='form-group'>
              <Button type='submit' className='button-extra'>
                Add comment
              </Button>
            </Form.Group>
          </Form>
          <ListGroup>
            {blog.comments.length > 0 ? (
              blog.comments.map((comment, i) => (
                <ListGroup.Item key={i}>{comment}</ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item>No comments yet.</ListGroup.Item>
            )}
          </ListGroup>
        </Container>
      </Card>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog

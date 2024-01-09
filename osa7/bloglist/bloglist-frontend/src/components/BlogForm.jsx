import { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createNewBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url,
    }

    const created = await createBlog(newBlog)
    if (created) {
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  return (
    <Container className='content-container'>
      <Form onSubmit={createNewBlog} className='form'>
        <h2>Create new blog</h2>
        <Form.Group className='form-group'>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type='text'
            value={title}
            name='Title'
            id='title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Group>
        <Form.Group className='form-group'>
          <Form.Label>Author:</Form.Label>
          <Form.Control
            type='text'
            value={author}
            name='Author'
            id='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Form.Group>
        <Form.Group className='form-group'>
          <Form.Label>Url:</Form.Label>
          <Form.Control
            type='text'
            value={url}
            name='Url'
            id='url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </Form.Group>
        <Container className='button-container'>
          <Button id='createButton' type='submit'>
            Create
          </Button>
        </Container>
      </Form>
    </Container>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm

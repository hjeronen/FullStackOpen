import { useState } from 'react'
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
      url: url
    }

    const created = await createBlog(newBlog)
    if (created) {
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  return (
    <form onSubmit={createNewBlog}>
      <h2>Create new blog</h2>
      <div>
        title:
        <input
          type='text'
          value={title}
          name='Title'
          id='title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type='text'
          value={author}
          name='Author'
          id='author'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type='text'
          value={url}
          name='Url'
          id='url'
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button id='createButton' type='submit'>create</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm

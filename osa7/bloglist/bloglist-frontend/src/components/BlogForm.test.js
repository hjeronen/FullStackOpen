import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

const blog = {
  title: 'Jest Test Blog',
  author: 'Jest Tester',
  url: 'http://fakeurl.org',
}

test('when creating a blog mockhandler gets called with correct data', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const titleInput = container.querySelector('#title')
  const authorInput = container.querySelector('#author')
  const urlInput = container.querySelector('#url')

  const createButton = screen.getByText('create')

  await user.type(titleInput, blog.title)
  await user.type(authorInput, blog.author)
  await user.type(urlInput, blog.url)
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)

  const content = createBlog.mock.calls[0][0]
  expect(content.title).toBe(blog.title)
  expect(content.author).toBe(blog.author)
  expect(content.url).toBe(blog.url)
})

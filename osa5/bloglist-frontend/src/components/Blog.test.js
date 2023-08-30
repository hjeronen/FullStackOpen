import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('only title and author are rendered', () => {
  const updateBlog = jest.fn()
  const deleteBlog = jest.fn()

  const user = {
    username: 'testuser',
    name: 'Test User',
    id: '012345'
  }

  const blog = {
    title: 'Jest Test Blog',
    author: 'Jest Tester',
    url: 'http://fakeurl.org',
    user: user
  }

  render(
    <Blog
      blog={blog}
      updateBlog={updateBlog}
      deleteBlog={deleteBlog}
      user={user} />
  )

  const title = screen.queryByText(blog.title)
  expect(title).toBeDefined()

  const author = screen.queryByText(blog.author)
  expect(author).toBeDefined()

  const url = screen.queryByText(blog.url)
  expect(url).toBeNull()

  const userName = screen.queryByText(blog.user.name)
  expect(userName).toBeNull()
})

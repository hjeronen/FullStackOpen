import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

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
  likes: 5,
  user: user
}

test('only title and author are rendered', () => {
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

test('other blog info is rendered after pressing the button', async () => {
  render(
    <Blog
      blog={blog}
      updateBlog={updateBlog}
      deleteBlog={deleteBlog}
      user={user} />
  )

  const urlBefore = screen.queryByText(blog.url)
  expect(urlBefore).toBeNull()
  
  const likesBefore = screen.queryByText(`likes: ${blog.likes}`)
  expect(likesBefore).toBeNull()

  const userNameBefore = screen.queryByText(blog.user.name)
  expect(userNameBefore).toBeNull()

  const clicker = userEvent.setup()
  const button = screen.getByText('view')
  await clicker.click(button)

  const urlAfter = screen.queryByText(blog.url)
  expect(urlAfter).toBeDefined()
  
  const likesAfter = screen.queryByText(`likes: ${blog.likes}`)
  expect(likesAfter).toBeDefined()

  const userNameAfter = screen.queryByText(blog.user.name)
  expect(userNameAfter).toBeDefined()
})

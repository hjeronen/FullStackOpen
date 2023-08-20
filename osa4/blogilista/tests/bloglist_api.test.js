const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const { blogs, newBlog } = require('./testBlogs')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(blogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(blogs.length)
})

test('blog identifier is named id, not _id', async () => {
  const response = await api.get('/api/blogs')
  const blog = response.body[0]

  expect(blog.id).toBeDefined()
})

test('a new blog can be added', async () => {
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const allBlogs = await helper.blogsInDb()
  const titles = allBlogs.map(blog => blog.title)

  expect(allBlogs).toHaveLength(blogs.length + 1)
  expect(titles).toContain('First class tests')
})

test('if field likes has no initial value, it is set to 0', async () => {
  const testBlog = {
    title: "Testing if likes are 0",
    author: "Tester Test",
    url: "https://test.url.org"
  }

  const response = await api.post('/api/blogs').send(testBlog)

  expect(response.body.likes).toBeDefined()
  expect(response.body.likes).toBe(0)
})

test('a blog without the field title cannot be added', async () => {
  const testBlog = {
    author: "Tester Test",
    url: "https://test.url.org"
  }

  await api
    .post('/api/blogs')
    .send(testBlog)
    .expect(400)
})

test('a blog without the field url cannot be added', async () => {
  const testBlog = {
    title: "Testing adding without url",
    author: "Tester Test"
  }

  await api
    .post('/api/blogs')
    .send(testBlog)
    .expect(400)
})

test('a blog with valid id can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(blogs.length - 1)

  const titles = blogsAtEnd.map(blog => blog.title)

  expect(titles).not.toContain(blogToDelete.title)
})

test('deleting a blog with invalid id will return error code 400', async () => {
  const blogToDelete = {
    id: helper.nonExistingId(),
    title: "Non-existing id cannot be deleted",
    author: "Tester Test",
    url: "https://fakeurl.org"
  }

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(400)
})

afterAll(async () => {
  await mongoose.connection.close()
})
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const { blogs, newBlog } = require('./testBlogs')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(blogs[0])
  await blogObject.save()
  blogObject = new Blog(blogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
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
  
  const response = await api.get('/api/blogs')
  const titles = response.body.map(blog => blog.title)
  
  expect(response.body).toHaveLength(3)
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

afterAll(async () => {
  await mongoose.connection.close()
})
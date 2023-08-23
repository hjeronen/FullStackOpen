const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const { blogs, newBlog } = require('./testBlogs')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

beforeAll(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})

describe('when there are blogs saved in db', () => {

  beforeEach(async () => {
    const user = await helper.getRootUser()
  
    const blogsToSave = blogs.map(blog => {
      blog.user = user.id
      return blog
    })
  
    await Blog.deleteMany({})
    await Blog.insertMany(blogsToSave)
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

  describe('when posting a new blog', () => {

    test('a new blog can be added with a valid token', async () => {
      const token = await helper.getValidToken()
      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const allBlogs = await helper.blogsInDb()
      const titles = allBlogs.map(blog => blog.title)

      expect(allBlogs).toHaveLength(blogs.length + 1)
      expect(titles).toContain(newBlog.title)
    })

    test('a new blog cannot be added without a valid token', async () => {
      const blogsAtStart = await helper.blogsInDb()

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)

      const blogsAtEnd = await helper.blogsInDb()
      const titles = blogsAtEnd.map(blog => blog.title)

      expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
      expect(titles).not.toContain(newBlog.title)
    })

    test('if field likes has no initial value, it is set to 0', async () => {
      const testBlog = {
        title: "Testing if likes are 0",
        author: "Tester Test",
        url: "https://test.url.org"
      }

      const token = await helper.getValidToken()
      const response = await api
        .post('/api/blogs')
        .send(testBlog)
        .set('Authorization', `Bearer ${token}`)

      expect(response.body.likes).toBeDefined()
      expect(response.body.likes).toBe(0)
    })

    test('a blog without the field title cannot be added', async () => {
      const testBlog = {
        author: "Tester Test",
        url: "https://test.url.org"
      }

      const token = await helper.getValidToken()
      await api
        .post('/api/blogs')
        .send(testBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
    })

    test('a blog without the field url cannot be added', async () => {
      const testBlog = {
        title: "Testing adding without url",
        author: "Tester Test"
      }

      const token = await helper.getValidToken()
      await api
        .post('/api/blogs')
        .send(testBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
    })

  })

  describe('when deleting a blog', () => {

    test('a blog with valid id can be deleted', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      const token = await helper.getValidToken()
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(blogs.length - 1)

      const titles = blogsAtEnd.map(blog => blog.title)

      expect(titles).not.toContain(blogToDelete.title)
    })

    test('a blog with invalid id will return error code 400', async () => {
      const token = await helper.getValidToken()
      await api
        .delete(`/api/blogs/${helper.nonExistingId()}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
    })

  })

  describe('when updating a blog', () => {

    test('the amount of likes can be updated with valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      const newLikes = blogToUpdate.likes + 2

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send({ ...blogToUpdate, likes: newLikes })
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()
      const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)

      expect(updatedBlog.likes).toBe(newLikes)
    })

    test('invalid id will return error code 400', async () => {
      const blogToUpdate = {
        title: "Invalid id should return 400",
        author: "Tester Test",
        url: "http://fakeurl.com",
        id: helper.nonExistingId()
      }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(400)
    })

    test('empty title will return error code 400', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = { ...blogsAtStart[0], title: "" }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(400)
    })

    test('empty url will return error code 400', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = { ...blogsAtStart[0], url: "" }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(400)
    })
  })

})

afterAll(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  await mongoose.connection.close()
})

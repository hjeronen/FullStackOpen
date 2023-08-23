const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const nonExistingId = async () => {
  const blog = new Blog({
    title: "This will be removed",
    author: "Tester Test",
    url: "https://fakeurl.org",
    likes: 2
  })

  const savedBlog = await blog.save()
  const id = savedBlog._id.toString()

  await Blog.findByIdAndRemove(id)

  return id
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const getRootUser = async () => {
  const user = await User.findOne({ username: 'root' })
  return user.toJSON()
}

const getValidToken = async () => {
  const user = await User.findOne({ username: 'root' })

  const token = jwt.sign(
    {
      username: user.username,
      id: user._id
    },
    process.env.SECRET
  )

  return token
}

module.exports = {
  nonExistingId,
  blogsInDb,
  usersInDb,
  getRootUser,
  getValidToken
}
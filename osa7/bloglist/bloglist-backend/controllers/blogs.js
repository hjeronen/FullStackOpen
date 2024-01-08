const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const userId = request.user.id
  const user = await User.findById(userId)

  if (!user) {
    return response.status(401).json({ error: 'Invalid user id' })
  }

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes ? request.body.likes : 0,
    user: userId
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const userId = request.user.id

  if (blog.user.toString() === userId.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  }

  return response.status(403).json({ error: 'Wrong user id' })
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true, runValidators: true, context: 'query' }
  )
  response.json(updatedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const comment = request.body.comment
  const blogId = request.params.id

  const blog = await Blog.findById(blogId)
  blog.comments.push(comment)

  const updatedBlog = await Blog.findByIdAndUpdate(
    blogId,
    blog,
    { new: true, runValidators: true, context: 'query' }
  )
  response.json(updatedBlog)
})

module.exports = blogsRouter

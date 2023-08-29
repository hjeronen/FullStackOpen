const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => (sum + blog.likes), 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const favorite = blogs.reduce((max, blog) =>
    max.likes > blog.likes ? max : blog, blogs[0]
  )

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  let stats = {}
  blogs.forEach(blog =>
    stats[blog.author] ? stats[blog.author] += 1 : stats[blog.author] = 1
  )

  const writerWithMostBlogs = Object.keys(stats).reduce((max, next) =>
    stats[max] > stats[next] ? max : next
  )

  return {
    author: writerWithMostBlogs,
    blogs: stats[writerWithMostBlogs]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  let stats = {}
  blogs.forEach(blog =>
    stats[blog.author]
      ? stats[blog.author] += blog.likes
      : stats[blog.author] = blog.likes
  )

  const writerWithMostLikes = Object.keys(stats).reduce((max, next) =>
    stats[max] > stats[next] ? max : next
  )

  return {
    author: writerWithMostLikes,
    likes: stats[writerWithMostLikes]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}

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

  const writers = blogs.map(blog => blog.author).sort()

  let stats = {}
  writers.forEach(writer => 
    stats[writer] ? stats[writer] += 1 : stats[writer] = 1
  )

  const writer = Object.keys(stats).reduce((max, next) => 
    stats[max] > stats[next] ? max : next
  )

  const result = {
    author: writer,
    blogs: stats[writer]
  }

  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}

const listHelper = require('../utils/list_helper')
const { emptyList, listWithOneBlog, blogs } = require('./testBlogs')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })

})

describe('favorite blog', () => {

  test('returns null if given list is empty', () => {
    const result = listHelper.favoriteBlog(emptyList)
    expect(result).toBe(null)
  })

  test('returns the only blog in a list with one blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('returns the blog with most likes in a list with many blogs', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })

})

describe('most blogs', () => {

  test('returns null for empty list', () => {
    const result = listHelper.mostBlogs(emptyList)
    expect(result).toBe(null)
  })

  test('returns the only writer in a list with one blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })

  test('returns the writer with most blogs in a list with many blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })

})

describe('most likes', () => {

  test('returns null for empty list', () => {
    const result = listHelper.mostLikes(emptyList)
    expect(result).toBe(null)
  })

  test('returns the only writer in a list with one blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('returns the writer with most likes in a list with many blogs', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })

})

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component tests', () => {
  let blog = {
    title:'Blog title',
    author:'Blog Author',
    url:  'google.com',
    likes:7
  }

  let mockUpdateBlog = jest.fn()
  let mockDeleteBlog = jest.fn()

  test('renders title and author', () => {
    const component = render(
      <Blog blog={blog} updateBlog={mockUpdateBlog} deleteBlog={mockDeleteBlog} />
    )
    expect(component.container).toHaveTextContent(
      'Blog title'
    )
  })

  test('clicking the view button displays url and number of likes', () => {
    const component = render(
      <Blog blog={blog} updateBlog={mockUpdateBlog} deleteBlog={mockDeleteBlog} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'google.com'
    )

    expect(component.container).toHaveTextContent(
      '7'
    )
  })
})


test('Test which checks that the blog\'s url and number of likes are shown when the button controlling the shown details has been clicked.', () => {
  const blog = {
    title: 'Blog title',
    author: 'Blog Author',
    url: 'google.com',
    user: 'Sean',
    likes: 555
  }
  const loggedUser = 'Sean'
  const handleBlogDelete = () => null
  const handleLike = () => null

  const component = render(
    <Blog
      blog={blog}
      loggedUser={loggedUser}
      handleBlogDelete={handleBlogDelete}
      handleLike={handleLike}
    />
  )

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  expect(component.container).toHaveTextContent(
    'google.com'
  )
  expect(component.container).toHaveTextContent(
    555
  )
})

test('Test which ensures that if the like button is clicked twice.', () => {
  const blog = {
    title: 'Blog title',
    author: 'Blog Author',
    url: 'google.com',
    user: 'Sean',
    likes: 555
  }
  const mockHandler = jest.fn()

  const loggedUser = 'Sean'
  const handleBlogDelete = () => null

  const component = render(
    <Blog
      blog={blog}
      loggedUser={loggedUser}
      handleBlogDelete={handleBlogDelete}
      handleLike={mockHandler}
    />
  )

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const likeButton = component.getByRole('button', { name: 'like' })
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

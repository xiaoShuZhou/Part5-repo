import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AddBlogForm from './AddBlogForm'

test('calls onSubmit with the right details', () => {
  const handleAddBlog = jest.fn()
  render(<AddBlogForm handleAddBlog={handleAddBlog} />)

  const titleInput = document.querySelector('#title')
  const authorInput = document.querySelector('#author')
  const urlInput = document.querySelector('#url')
  const likesInput = document.querySelector('#likes')
  const form = document.querySelector('#form')

  fireEvent.change(titleInput, { target: { value: 'Test title' } })
  fireEvent.change(authorInput, { target: { value: 'Test author' } })
  fireEvent.change(urlInput, { target: { value: 'http://test.com' } })
  fireEvent.change(likesInput, { target: { value: '5' } })

  fireEvent.submit(form)

  expect(handleAddBlog).toHaveBeenCalledTimes(1)
  expect(handleAddBlog).toHaveBeenCalledWith({
    title: 'Test title',
    author: 'Test author',
    url: 'http://test.com',
    likes: '5'
  })
})

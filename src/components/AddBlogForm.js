import React from 'react'
import { useState } from 'react'


const AddBlogForm = ({ handleAddBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    handleAddBlog({
      title: title,
      author: author,
      url: url,
      likes: likes
    })
    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes('')
  }


  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleLikeChange = (event) => {
    setLikes(event.target.value)
  }

  return (
    <div>
      <form id='form' onSubmit={handleSubmit}>
        <div>
          title
          <input
            id='title'
            type="text"
            value={title}
            name="Title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author
          <input
            id='author'
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url
          <input
            id='url'
            type="text"
            value={url}
            name="Url"
            onChange={handleUrlChange}
          />
        </div>
        <div>
          likes
          <input
            id='likes'
            type="text"
            value={likes}
            name="Likes"
            onChange={handleLikeChange}
          />
        </div>
        <button type="submit">add blog</button>
      </form>
    </div>
  )
}

export default AddBlogForm
import { useState, useEffect } from 'react'

import * as restaurantService from '../../services/restaurantService'
import { useNavigate } from 'react-router-dom'


const CommentForm = (props) => {
  const initialState = { content: '' }
	const [formData, setFormData] = useState(initialState)

	const handleChange = (evt) => {
		setFormData({ ...formData, [evt.target.name]: evt.target.value })
	}

    const handleSubmit = (evt) => {
		evt.preventDefault()
		props.handleAddComment(formData)
		setFormData({ content: '' })
	}

    return (
		<form className="comment-form" onSubmit={handleSubmit}>
  <label htmlFor="content">Your comment:</label>
  <textarea
    required
    name="content"
    id="content"
    value={formData.content}
    onChange={handleChange}
  />
  <button className="btn" type="submit">SUBMIT COMMENT</button>
</form>

	)
}

export default CommentForm 
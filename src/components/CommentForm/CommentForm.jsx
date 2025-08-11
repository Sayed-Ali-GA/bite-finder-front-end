import { useState, useEffect } from 'react'

import * as restaurantService from '../../services/restaurantService'


const CommentForm = (props) => {
  const initialState = { text: '' }
	const [formData, setFormData] = useState(initialState)

	const handleChange = (evt) => {
		setFormData({ ...formData, [evt.target.name]: evt.target.value })
	}

    const handleSubmit = (evt) => {
		evt.preventDefault()
		props.handleAddComment(formData)
		setFormData({ text: '' })
	}

    return (
		<form className="comment-form" onSubmit={handleSubmit}>
  <label htmlFor="text-input">Your comment:</label>
  <textarea
    required
    name="text"
    id="text-input"
    value={formData.text}
    onChange={handleChange}
  />
  <button className="btn" type="submit">SUBMIT COMMENT</button>
</form>

	)
}

export default CommentForm
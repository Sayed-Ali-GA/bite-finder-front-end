import { useState } from "react"

const RestaurantForm = (props)=>{
    const initialState = { 
        name:'',
        type: '',
        location:'',
        description:'',
        /** TODO: will add cloudinary image later  **/
    }
    const [formData, setFormData] = useState(initialState)

    const handleChange = (evt) => {
		setFormData({ ...formData, [evt.target.name]: evt.target.value })
	}

    const handleSubmit = (evt)=>{
    evt.preventDefault()
    setFormData(initialState)
    }

    return(
        <>
        <h1>Restaurant Form</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
            required 
            type="text" 
            name="name" 
            value={formData.name}
            onChange={handleChange}
            />

            <label htmlFor="type">Type:</label>
            <input
            required 
            type="text" name="type" 
            value={formData.type}
            onChange={handleChange}
            />

            <label htmlFor="location">Location:</label>
            <input 
            required
            type="text" 
            name="location"
            value={formData.location}
            onChange={handleChange}
            />

            <label htmlFor="description">Description:</label>
            <textarea
            required 
            name="description" 
            id="description"
            value={formData.description}
            onChange={handleChange} 
            ></textarea>
            <button>Submit</button>
        </form >
        </>
        
    )

}
export default RestaurantForm
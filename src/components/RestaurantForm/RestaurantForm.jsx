import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const RestaurantForm = (props) => {
  const navigate = useNavigate()

  const initialState = { 
    name: '',
    type: '',
    location: '',
    description: '',
  }

  const [formData, setFormData] = useState(initialState)

  // Pre-fill form if editing
  useEffect(() => {
    if (props.selectedRestaurant) {
      setFormData({
        name: props.selectedRestaurant.name || '',
        type: props.selectedRestaurant.type || '',
        location: props.selectedRestaurant.location || '',
        description: props.selectedRestaurant.description || '',
      })
    }
    else{
      setFormData(initialState)
    }
  }, [props.selectedRestaurant])

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()

    try {
      if (props.selectedRestaurant) {
        // Editing
        const updatedRestaurant = await props.handleUpdateRestaurant(formData, props.selectedRestaurant._id)
        if (updatedRestaurant && updatedRestaurant._id) {
          navigate(`/restaurant/${updatedRestaurant._id}`)
        } else {
          navigate("/") // fallback
        }
      } else {
        // Adding
        const newRestaurant = await props.handleAddRestaurant(formData)
        if (newRestaurant && newRestaurant._id) {
          props.setSelectedRestaurant(newRestaurant)
          navigate(`/restaurant/${newRestaurant._id}`)
        } else {
          navigate("/") // fallback
        }
      }
    } catch (err) {
      console.error("Error saving restaurant:", err)
    }

    setFormData(initialState)
  }

  return (
    <>
      <h1>{props.selectedRestaurant ? "Edit Restaurant" : "Add Restaurant"}</h1>
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
          type="text" 
          name="type" 
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
          value={formData.description}
          onChange={handleChange} 
        ></textarea>

        <button type="submit">
          {props.selectedRestaurant ? "Edit" : "Submit"}
        </button>
      </form>
    </>
  )
}

export default RestaurantForm

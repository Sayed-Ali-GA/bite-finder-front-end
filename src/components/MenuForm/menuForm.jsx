import { useState } from "react";

const MenuForm = (props) => {
    // console.log(props)
    const initialState = {
        name: '',
        type: '',
        description: '',
        price: '',
    };

    const [formData, setFormData] = useState(initialState);

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();

        if (props.selected) {
            props.handleUpdateMenu(formData, props.selected._id);
        } else {
            props.handleAddMenu(formData);
        }

        setFormData(initialState);
    };

    return (
        <>
            <h1>Menu Form</h1>
            <form onSubmit={handleSubmit}>
                
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="type">Type:</label>
                <select
                    name="type"
                    id="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                >
                    <option value="">--Please choose an option--</option>
                    <option value="mainCourse">Main Course</option>
                    <option value="dessert">Dessert</option>
                    <option value="drinks">Drinks</option>
                </select>

                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="price">Price:</label>
                <input
                    type="number"
                    name="price"
                    id="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    {props.selected ? "Update dish" : "Add a dish"}
                </button>
            </form>
        </>
    );
};

export default MenuForm;
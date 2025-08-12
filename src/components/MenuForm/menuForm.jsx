import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as menuService from "../../services/menuService";

const MenuForm = ({ handleAddMenu, handleUpdateMenu, user, restaurant }) => {
    const { restaurantId, menuId } = useParams();
    const navigate = useNavigate();

    const initialState = {
        name: "",
        description: "",
        price: "",
        type: "main",
    };

    const [formData, setFormData] = useState(initialState);

 useEffect(() => {
  const fetchMenu = async () => {
    if (!menuId) return;

    try {
      const menus = await menuService.indexByRestaurant(restaurantId);
      const menu = menus.find(item => item._id === menuId);
      if (menu) {
        setFormData({
          name: menu.name || "",
          description: menu.description || "",
          price: menu.price || "",
          type: menu.type || "main",
        });
      }
    } catch (err) {
      console.error("Failed to load menu:", err);
    }
  };
  fetchMenu();
}, [menuId, restaurantId]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (menuId) {
                await handleUpdateMenu(formData, menuId);
            } else {
                await handleAddMenu(formData);
            }

            setFormData(initialState)
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };
    const isOwner = restaurant?.ownerId?._id === user?._id;


    return (
        <>
            {isOwner ? (
                <>
                    <h1>{menuId ? "Edit Menu" : "Add Menu"}</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Title:</label>
                        <input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="price">Price:</label>
                        <input
                            type="number"
                            id="price"
                            min="0"
                            step="0.01"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />

                        <label htmlFor="type">Type:</label>
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                        >
                            <option value="main">Main Course</option>
                            <option value="dessert">Dessert</option>
                            <option value="drinks">Drinks</option>
                        </select>

                        <button type="submit">{menuId ? "Update Menu" : "Add Menu"}</button>
                    </form>
                </>
            ) : (
                <p>You are not authorized to add or edit this menu.</p>
            )}
        </>
    );
};

export default MenuForm;

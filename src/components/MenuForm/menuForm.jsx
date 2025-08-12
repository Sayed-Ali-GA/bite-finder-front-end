import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as menuService from "../../services/menuService";

const MenuForm = ({ setMenus }) => {
    const { restaurantId, menuId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        type: "main",
    });

    useEffect(() => {
        async function fetchMenu() {
            if (menuId) {
                try {
                    const menu = await menuService.show(restaurantId, menuId);
                    setFormData({
                        title: menu.title || "",
                        description: menu.description || "",
                        price: menu.price || "",
                        type: menu.type || "main",
                    });
                } catch (err) {
                    console.error("Failed to fetch menu", err);
                    navigate(`/restaurant/${restaurantId}/menu`);
                }
            }
        }
        fetchMenu();
    }, [menuId, restaurantId, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (menuId) {
                const updatedMenu = await menuService.update(restaurantId, menuId, formData);
                setMenus(menus => menus.map(menu => (menu._id === updatedMenu._id ? updatedMenu : menu)));
            } else {
                const newMenu = await menuService.create(restaurantId, formData);
                setMenus(menus => [newMenu, ...menus]);
            }
            navigate(`/restaurant/${restaurantId}/menu`);
        } catch (error) {
            console.error("Error saving menu:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="menu-form">
            <h2>{menuId ? "Edit Menu" : "Add New Menu"}</h2>


            <label htmlFor="name">Title:</label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            />

            <label htmlFor="description">
                Description:
            </label>
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
            />

            <label htmlFor="price">
                Price:
            </label>
            <input
                type="number"
                min="0"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
            />

            <label htmlFor="type">
                Type:
            </label>
            <select
                name="type"
                value={formData.type}
                onChange={handleChange}
            >
                <option value="main">Main Course</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
            </select>


            <button type="submit">{menuId ? "Update" : "Add"}</button>
        </form>
    );
};

export default MenuForm;
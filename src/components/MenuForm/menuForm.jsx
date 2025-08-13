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
            setFormData(initialState);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const ownerIdValue = typeof restaurant?.ownerId === "object"
        ? restaurant?.ownerId?._id
        : restaurant?.ownerId;

    const isOwner = ownerIdValue?.toString() === user?._id?.toString();

    return (
        <>
            {isOwner ? (
                <>
                    <div
                        style={{
                            fontFamily: 'Arial, sans-serif',
                            minHeight: '100vh',
                            padding: '3rem 1rem',
                            background: 'linear-gradient(135deg, #0F2027, #203A43, #2C5364)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            color: 'white',
                        }}
                    >
                        <h1
                            style={{
                                textAlign: 'center',
                                marginBottom: '3rem',
                                fontWeight: 800,
                                fontSize: '2.5rem',
                                background: 'linear-gradient(135deg, #FF6A00, #EE0979)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                            }}
                        >
                            {menuId ? "Edit Menu" : "Add Menu"}
                        </h1>

                        <form
                            onSubmit={handleSubmit}
                            style={{
                                maxWidth: '600px',
                                width: '100%',
                                padding: '2rem',
                                borderRadius: '20px',
                                background: 'rgba(255, 255, 255, 0.07)',
                                backdropFilter: 'blur(15px)',
                                boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1.5rem',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <label style={{ flex: '0 0 120px', fontWeight: 'bold', textAlign: 'right', marginRight: '1rem' }}>
                                    Title:
                                </label>
                                <input
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        flex: 1,
                                        padding: '10px',
                                        fontSize: '1rem',
                                        borderRadius: '12px',
                                        border: '2px solid rgba(255,255,255,0.3)',
                                        background: 'rgba(255,255,255,0.1)',
                                        color: 'white',
                                    }}
                                />
                            </div>

                            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                <label style={{ flex: '0 0 120px', fontWeight: 'bold', textAlign: 'right', marginRight: '1rem', paddingTop: '0.5rem' }}>
                                    Description:
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        flex: 1,
                                        minHeight: '150px',
                                        padding: '12px',
                                        fontSize: '1rem',
                                        fontStyle: 'italic',
                                        borderRadius: '12px',
                                        border: '2px solid rgba(255,255,255,0.3)',
                                        background: 'rgba(255,255,255,0.1)',
                                        color: 'white',
                                        resize: 'vertical',
                                    }}
                                />
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <label style={{ flex: '0 0 120px', fontWeight: 'bold', textAlign: 'right', marginRight: '1rem' }}>
                                    Price:
                                </label>
                                <input
                                    name="price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        flex: 1,
                                        padding: '10px',
                                        fontSize: '1rem',
                                        borderRadius: '12px',
                                        border: '2px solid rgba(255,255,255,0.3)',
                                        background: 'rgba(255,255,255,0.1)',
                                        color: 'white',
                                    }}
                                />
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <label style={{ flex: '0 0 120px', fontWeight: 'bold', textAlign: 'right', marginRight: '1rem' }}>
                                    Type:
                                </label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        flex: 1,
                                        padding: '10px',
                                        fontSize: '1rem',
                                        borderRadius: '12px',
                                        border: '2px solid rgba(255,255,255,0.3)',
                                        background: 'rgba(255,255,255,0.1)',
                                        color: 'white',
                                    }}
                                >
                                    <option value="main">Main Course</option>
                                    <option value="dessert">Dessert</option>
                                    <option value="drinks">Drinks</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                style={{
                                    marginTop: '1rem',
                                    padding: '12px',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    borderRadius: '12px',
                                    border: '2px solid rgba(255,255,255,0.3)',
                                    background: 'linear-gradient(135deg, #FF6A00, #EE0979)',
                                    color: 'white',
                                    cursor: 'pointer',
                                    transition: 'transform 0.3s ease, opacity 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                                    e.currentTarget.style.opacity = 0.9;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.opacity = 1;
                                }}
                            >
                                {menuId ? "Update Menu" : "Add Menu"}
                            </button>
                        </form>
                    </div>

                </>
            ) : (
                <p>You are not authorized to add or edit this menu.</p>
            )}
        </>
    );
};

export default MenuForm;

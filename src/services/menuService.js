const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/restaurant`;

const index = async (restaurantId) => {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE_URL}/${restaurantId}/menu`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return res.json();
    } catch (err) {
        console.error('Error fetching menu:', err);
    }
};

const create = async (restaurantId, formData) => {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE_URL}/${restaurantId}/menu`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });
        return res.json();
    } catch (err) {
        console.error('Error creating menu:', err);
    }
};

const update = async (restaurantId, formData, menuId) => {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE_URL}/${restaurantId}/menu/${menuId}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });
        return res.json();
    } catch (err) {
        console.error('Error updating menu:', err);
    }
};

const deleteMenu = async (restaurantId,menuId) => {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE_URL}/${restaurantId}/menu/${menuId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return res.json();
    } catch (err) {
        console.error('Error deleting menu:', err);
    }
};

export {
    index,
    create,
    update,
    deleteMenu,
};

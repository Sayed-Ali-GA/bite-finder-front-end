const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/restaurant`;

const indexByRestaurant = async (restaurantId) => {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${BASE_URL}/${restaurantId}/menu`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.json();
    } catch (err) {
        console.log('Error fetching menus:', err);
    }
};

const create = async (restaurantId, menuData) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/${restaurantId}/menu/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(menuData),
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
};

const show = async (restaurantId, menuId) => {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE_URL}/${restaurantId}/menu/${menuId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
    } catch (err) {
        console.error('Error fetching menu:', err);
    }
};

const update = async (restaurantId, menuId, formData) => {
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

        const data = await res.json()
        return data
    } catch (err) {
        console.error('Error updating menu:', err);
    }
};

const deleteMenu = async (restaurantId, menuId) => {
    try {
        const token = localStorage.getItem('token')
        const res = await fetch(`${BASE_URL}/${restaurantId}/menu/${menuId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const data = await res.json()
        return data

    } catch (err) {
        console.error('Error deleting menu:', err);
    }
};

export {
    indexByRestaurant,
    create,
    show,
    update,
    deleteMenu,
};

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/restaurant/menu`;

const index = async () => {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(BASE_URL, {
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

const create = async (formData) => {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(BASE_URL, {
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

const update = async (formData, menuId) => {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE_URL}/${menuId}`, {
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

const deleteMenu = async (menuId) => {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${BASE_URL}/${menuId}`, {
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

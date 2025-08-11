const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/restaurant/menu`;

const index = async () => {
    try {
        const res = await fetch(BASE_URL);
        return res.json();
    } catch (err) {
        console.error('Error fetching menu:', err);
    }
};

const create = async (formData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        return res.json();
    } catch (err) {
        console.error('Error creating menu:', err);
    }
};

const update = async (formData, menuId) => {
    try {
        const res = await fetch(`${BASE_URL}/${menuId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        return res.json();
    } catch (err) {
        console.error('Error updating menu:', err);
    }
};

const deleteMenu = async (menuId) => {
    try {
        const res = await fetch(`${BASE_URL}/${menuId}`, {
            method: 'DELETE',
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
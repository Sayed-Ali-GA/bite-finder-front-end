import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as menuService from '../../services/menuService';

const MenuDetails = ({ handleDeleteMenu, user }) => {
    const { restaurantId, menuId } = useParams();
    const [menu, setMenu] = useState(null);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const data = await menuService.show(menuId);
                setMenu(data);
            } catch (err) {
                console.error("Error fetching menu:", err);
            }
        };
        fetchMenu();
    }, [menuId]);

    if (!menu) return <main>Loading...</main>;

    return (
        <main className="menu-details">
            <h2>{menu.title}</h2>
            <p>{menu.description}</p>
            <p>{menu.price}</p>


            {menu.author?._id === user?._id && (
                <div>
                    <Link to={`/restaurant/${restaurantId}/menu/${menuId}/edit`}>Edit</Link>
                    <button onClick={() => handleDeleteMenu(menuId)}>Delete</button>
                </div>
            )}
        </main>
    );
};

export default MenuDetails 
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as menuService from "../../services/menuService";
import { Link } from 'react-router-dom'


const MenuDetails = ({ handleDeleteMenu, user }) => {
    const { restaurantId } = useParams();
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        const data = menuService.indexByRestaurant(restaurantId)
        setMenus(data)

    }, [restaurantId]);

    const mainCourse = menus.filter(menu => menu.type === "main");
    const drinks = menus.filter(menu => menu.type === "drinks");
    const dessert = menus.filter(menu => menu.type === "dessert");

    return (
        <main className="menu-details">
            {mainCourse.length > 0 && (
                <>
                    <h2>Main Course</h2>
                    <ul>
                        {mainCourse.map(menu => (
                            <li key={menu._id}>
                                {menu.title} 
                                {menu.description} - {menu.price} BD
                                {menu.author?._id === user?._id && (
                                    <div>
                                        <button onClick={() => handleDeleteMenu(menu._id)}>Delete</button>
                                        <Link to={`/restaurant/${restaurantId}/menu/${menu._id}}/edit`}>Edit</Link>
                                    </div>

                                )}
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {dessert.length > 0 && (
                <>
                    <h2>Dessert</h2>
                    <ul>
                        {dessert.map(menu => (
                            <li key={menu._id}>
                                {menu.title}
                                {menu.description} - {menu.price} BD
                                {menu.author?._id === user?._id && (
                                    <div>
                                        <button onClick={() => handleDeleteMenu(menu._id)}>Delete</button>
                                        <Link to={`/restaurant/${restaurantId}/menu/${menu._id}}/edit`}>Edit</Link>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {drinks.length > 0 && (
                <>
                    <h2>Drinks</h2>
                    <ul>
                        {drinks.map(menu => (
                            <li key={menu._id}>
                                {menu.title} 
                                {menu.description} - {menu.price} BD
                                {menu.author?._id === user?._id && (
                                    <div>
                                        <button onClick={() => handleDeleteMenu(menu._id)}>Delete</button>
                                        <Link to={`/restaurant/${restaurantId}/menu/${menu._id}}/edit`}>Edit</Link>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </>
            )}

        </main>
    );
};

export default MenuDetails;

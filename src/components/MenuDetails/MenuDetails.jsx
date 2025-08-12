import { Link, useParams } from "react-router-dom";

const MenuDetails = ({ menus = [], handleDeleteMenu, user }) => {
    const { restaurantId } = useParams();

    if (!Array.isArray(menus)) {
        console.error("menus prop is not an array:", menus);
        return <p>Error loading menus.</p>;
    }

    const mainCourse = menus.filter(menu => menu.type === "main");
    const drinks = menus.filter(menu => menu.type === "drinks");
    const dessert = menus.filter(menu => menu.type === "dessert");

    return (
        <main className="menu-details">
            <Link to={`/restaurant/${restaurantId}/menu/new`}>Add New Menu Item</Link>

            {mainCourse.length > 0 && (
                <>
                    <h2>Main Course</h2>
                    <ul>
                        {mainCourse.map(menu => (
                            <li key={menu._id}>
                                <strong>{menu.name || "No Title"}</strong> - {menu.description || "No Description"} - {menu.price ?? "N/A"} BD
                                {user && menu.creatorId === user._id && (
                                    <div>
                                        <button onClick={() => handleDeleteMenu(restaurantId, menu._id)}>Delete</button>
                                        <Link to={`/restaurant/${restaurantId}/menu/${menu._id}`}>Edit</Link>
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
                                <strong>{menu.name || "No Title"}</strong> - {menu.description || "No Description"} - {menu.price ?? "N/A"} BD
                                {user && menu.creatorId === user._id && (
                                    <div>
                                        <button onClick={() => handleDeleteMenu(restaurantId, menu._id)}>Delete</button>
                                        <Link to={`/restaurant/${restaurantId}/menu/${menu._id}`}>Edit</Link>
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
                                <strong>{menu.name || "No Title"}</strong> - {menu.description || "No Description"} - {menu.price ?? "N/A"} BD
                                {user && menu.creatorId === user._id && (
                                    <div>
                                        <button onClick={() => handleDeleteMenu(restaurantId, menu._id)}>Delete</button>
                                        <Link to={`/restaurant/${restaurantId}/menu/${menu._id}`}>Edit</Link>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {menus.length === 0 && <p>No menus found for this restaurant.</p>}
        </main>
    );
};

export default MenuDetails;
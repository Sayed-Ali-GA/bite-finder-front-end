import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as menuService from "../../services/menuService";
import * as restaurantService from "../../services/restaurantService";

const MenuDetails = ({ menus, setMenus, handleDeleteMenu, user }) => {

  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const data = await menuService.indexByRestaurant(restaurantId);
        setMenus(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMenus();
  }, [restaurantId]);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const data = await restaurantService.show(restaurantId);
        setRestaurant(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRestaurant();
  }, [restaurantId]);

  const mainCourse = menus.filter((menu) => menu.type === "main");
  const drinks = menus.filter((menu) => menu.type === "drinks");
  const dessert = menus.filter((menu) => menu.type === "dessert");

  if (!restaurant) return <main>Loading restaurant data...</main>;

  const isOwner = restaurant.ownerId?._id === user?._id;

  return (
    <main>
      <Link to={`/restaurant/${restaurantId}/menu/new`}>Add New Menu</Link>

      {mainCourse.length > 0 && (
        <>
          <h2>Main Course</h2>
          {mainCourse.map((menu) => (
            <div key={menu._id}>
              <div>
                <strong>{menu.name}</strong> - {menu.price} BD 
              </div>
              <div style={{ fontSize: "small" }}>{menu.description}</div>

              {isOwner && (
                <>
                  <button onClick={() => handleDeleteMenu(restaurantId, menu._id)}>Delete</button>
                  <Link to={`/restaurant/${restaurantId}/menu/${menu._id}/edit`}>
                    Edit
                  </Link>
                </>
              )}
            </div>
          ))}
        </>
      )}

      {dessert.length > 0 && (
        <>
          <h2>Dessert</h2>
          {dessert.map((menu) => (
            <div key={menu._id}>
              <div>
                <strong>{menu.name}</strong> - {menu.price} BD 
              </div>
              <div style={{ fontSize: "small" }}>{menu.description}</div>

              {isOwner && (
                <>
                  <button onClick={() => handleDeleteMenu(restaurantId, menu._id)}>Delete</button>
                  <Link to={`/restaurant/${restaurantId}/menu/${menu._id}/edit`}>
                    Edit
                  </Link>
                </>
              )}
            </div>
          ))}
        </>
      )}

      {drinks.length > 0 && (
        <>
          <h2>Drinks</h2>
          {drinks.map((menu) => (
            <div key={menu._id}>
              <div>
                <strong>{menu.name}</strong> - {menu.price} BD 
              </div>
              <div style={{ fontSize: "small" }}>{menu.description}</div>

              {isOwner && (
                <>
                  <button onClick={() => handleDeleteMenu(restaurantId, menu._id)}>Delete</button>
                  <Link to={`/restaurant/${restaurantId}/menu/${menu._id}/edit`}>
                    Edit
                  </Link>
                </>
              )}
            </div>
          ))}
        </>
      )}
    </main>
  );
};

export default MenuDetails;

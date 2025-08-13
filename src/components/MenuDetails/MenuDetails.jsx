import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as menuService from "../../services/menuService";
import * as restaurantService from "../../services/restaurantService";
import './MenueDetails.css'

const MenuDetails = ({ menus, setMenus, handleDeleteMenu, user }) => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [activeTab, setActiveTab] = useState("Main Course");

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
  }, [restaurantId, setMenus]);

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

  if (!restaurant) return <main style={{color:'white', textAlign:'center', marginTop:'3rem'}}>Loading restaurant data...</main>;

  const isOwner = restaurant.ownerId?._id === user?._id;

  const mainCourse = menus.filter((menu) => menu.type === "main");
  const drinks = menus.filter((menu) => menu.type === "drinks");
  const dessert = menus.filter((menu) => menu.type === "dessert");

  const renderMenuCards = (items) => {
    if (!items.length) return <h4 className="no-menu">No items in this category!</h4>;
    return items.map((menu) => (
      <div key={menu._id} className="menu-card">
        <div className="menu-field">
          <span className="menu-label">Name:</span> {menu.name}
        </div>
        <div className="menu-field">
          <span className="menu-label">Price:</span> {menu.price} BD
        </div>
        <div className="menu-field">
          <span className="menu-label">Description:</span> {menu.description}
        </div>
        {isOwner && (
          <div className="menu-buttons">
            <button className="btn-delete" onClick={() => handleDeleteMenu(restaurantId, menu._id)}>Delete</button>
            <Link to={`/restaurant/${restaurantId}/menu/${menu._id}/edit`}>
              <button className="btn-edit">Edit</button>
            </Link>
          </div>
        )}
      </div>
    ));
  };

  const tabs = [
    { name: "Main Course", items: mainCourse },
    { name: "Dessert", items: dessert },
    { name: "Drinks", items: drinks },
  ];

  return (
    <div className="menu-details-container">
      <header className="menu-header">
        <h1 className="restaurant-name">{restaurant.name} Menu</h1>
        {isOwner && (
          <Link to={`/restaurant/${restaurantId}/menu/new`}>
            <button className="btn-add">Add New Menu</button>
          </Link>
        )}
      </header>

      {menus.length === 0 ? (
        <h4 className="no-menu">No Menu Yet!</h4>
      ) : (
        <div className="menu-layout">
          <aside className="menu-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                className={`tab-button ${activeTab === tab.name ? "active" : ""}`}
                onClick={() => setActiveTab(tab.name)}
              >
                {tab.name}
              </button>
            ))}
          </aside>
          <div className="menu-content">
            {tabs.map(tab => tab.name === activeTab && renderMenuCards(tab.items))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuDetails;
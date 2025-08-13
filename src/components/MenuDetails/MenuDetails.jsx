import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as menuService from "../../services/menuService";
import * as restaurantService from "../../services/restaurantService";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

  const mainCourse = menus.filter((menu) => menu.type === "main");
  const drinks = menus.filter((menu) => menu.type === "drinks");
  const dessert = menus.filter((menu) => menu.type === "dessert");

  if (!restaurant) return <main>Loading restaurant data...</main>;

  const isOwner = restaurant.ownerId?._id === user?._id;

  const renderMenuSection = (title, items) => {
    if (!items.length) return null;
    return (
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ borderBottom: "2px solid #ff8c00", paddingBottom: "0.5rem", color: "#ff6600" }}>
          {title}
        </h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          {items.map((menu) => (
            <Col key={menu._id}>
              <Card style={{ minHeight: "200px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
                <Card.Body>
                  <Card.Title>{menu.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{menu.price} BD</Card.Subtitle>
                  <Card.Text style={{ fontSize: "0.9rem" }}>{menu.description}</Card.Text>
                  {isOwner && (
                    <div className="d-flex gap-2">
                      <Button 
                        variant="danger" 
                        size="sm" 
                        onClick={() => handleDeleteMenu(restaurantId, menu._id)}
                      >
                        Delete
                      </Button>
                      <Link to={`/restaurant/${restaurantId}/menu/${menu._id}/edit`}>
                        <Button variant="warning" size="sm">Edit</Button>
                      </Link>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    );
  };

  return (
    <Container style={{ padding: "2rem 0" }}>
      <header className="mb-4">
        <h1 style={{ color: "#ff6600" }}>{restaurant.name} Menu</h1>
        {isOwner && (
          <Link to={`/restaurant/${restaurantId}/menu/new`}>
            <Button variant="success">Add New Menu</Button>
          </Link>
        )}
      </header>

      {menus.length === 0 ? (
        <h4 style={{ color: "#888" }}>No Menu Yet!</h4>
      ) : (
        <>
          {renderMenuSection("Main Course", mainCourse)}
          {renderMenuSection("Dessert", dessert)}
          {renderMenuSection("Drinks", drinks)}
        </>
      )}
    </Container>
  );
};

export default MenuDetails;

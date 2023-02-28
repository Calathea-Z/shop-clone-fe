import { useContext } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import ListGroup from "react-bootstrap/ListGroup";
import { Store } from "../Store";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";

const Cart = () => {
  const { state, dispatch: cartDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateClickHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert(`Sorry, ${item.name} is out of stock`);
      return
    }
    cartDispatch(
      {
      type:'CART_ADD_ITEM', 
      payload: {...item, quantity}
     });
  }
  return (
    <div>
      <Helmet>
        <title>Your Cart</title>
      </Helmet>
      <h1> Your Cart </h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/">Continue Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{" "}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button variant="light"
                       onClick={() => updateClickHandler(item, item.quantity-1)} 
                      disabled={item.quantity === 1}>
                        <i className="fas fa-minus-circle"></i>
                      </Button>{" "}
                      <span>{item.quantity}</span>{" "}
                      <Button
                        variant="light"
                        onClick={() => updateClickHandler(item, item.quantity+1)}
                        disabled={item.quantity === item.CountInStock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>{" "}
                    </Col>
                    <Col md={3}>${item.price}</Col>
                    <Col md={2}>
                      <Button variant="light">
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                    items) : ${" "}
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      disabled={cartItems.length === 0}
                    >
                      Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default Cart;

import React, { useEffect, useState } from "react";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { CartState } from "../context/Context";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  return (
    <>
      {cart.length === 0 ? (
        <h4 className="container">Please add items to the cart.</h4>
      ) : (
        <div className="home">
          <div className="productContainer">
            <ListGroup>
              {cart.map((prod) => (
                <ListGroup.Item key={prod.id}>
                  <Row>
                    <Col xs={4} md={2}>
                      <Image src={prod.image} alt={prod.name} fluid rounded />
                    </Col>
                    <Col xs={8} md={4}>
                      <span>
                        <p>{prod.name}</p>
                      </span>
                      <p> Tshs. {prod && prod.price.split(".")[0]}</p>
                      <Rating rating={prod.ratings} />
                    </Col>
                    <Col xs={8} md={4}>
                      <Form.Control
                        as="select"
                        value={prod.qty}
                        onChange={(e) =>
                          dispatch({
                            type: "CHANGE_CART_QTY",
                            payload: {
                              id: prod.id,
                              qty: e.target.value,
                            },
                          })
                        }
                        style={{ width: "100px" }}
                      >
                        {[...Array(prod.inStock).keys()].map((x) => (
                          <option key={x + 1}>{x + 1}</option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col xs={4} md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: prod,
                          })
                        }
                      >
                        <AiFillDelete fontSize="20px" />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
          <div className="filters summary">
            <span className="title">Subtotal ({cart.length}) items</span>
            <span style={{ fontWeight: 700, fontSize: 20 }}>
              Total: Tshs. {total}
            </span>
            <Button
              type="button"
              disabled={cart.length === 0}
              as={Link}
              to={{
                pathname: "/checkout",
                state: { total: total}, 
              }}
            >
              Proceed to Checkout
            </Button>
            <br />
            <div>
              <h5>We Accept the following payment methods</h5>
              <li>Credit Card</li>
              <li>Mpesa</li>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;

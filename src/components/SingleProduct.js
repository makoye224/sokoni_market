import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { CartState } from "../context/Context";
import Rating from "./Rating";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";

const SingleProduct = ({ prod }) => {
  const history = useHistory();
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleBuyNowClick = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: prod,
    });
    history.push(`/buynow/${prod.id}`);
  };

  return (
    <Card>
      <br/>
      <Card.Title className="container" style={{fontSize: '16px', fontWeight: 'bold'}}>{prod && prod.name}</Card.Title>
      <Card.Subtitle className="mb-2 container" style={{color: 'green'}}>
        Tshs. {prod && prod.price.split(".")[0]}
      </Card.Subtitle>
      
      <Card.Body>
      <a
  onClick={() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    history.push(`/product-details/${prod.id}`);
  }}
  style={{ cursor: "pointer" }}
>
        <img src={prod.image} className="img-fluid"/>
        <Card.Text style={{height: '5rem', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '13px'}}>
          {prod && prod.description}
        </Card.Text>
        
        <div className="d-flex justify-content-between" style={{scale: '90%'}}>
          <Rating rating={prod.ratings}/>
          {prod.fastDelivery ? (
            <p>Fast Delivery</p>
          ) : (
            <p>4-day Delivery</p>
          )}
        </div>
        </a>
        {!prod.inStock ? (

          <div className="text-danger d-flex justify-content-center" >Out of Stock</div>
        ) : (
          <div className="d-flex justify-content-center">
            {cart.some((p) => p.id === prod.id) ? (
              <RemoveShoppingCartIcon
                variant="danger"
                onClick={() =>
                  dispatch({
                    type: "REMOVE_FROM_CART",
                    payload: prod,
                  })
                }
                style={{color: 'red'}}
              >
              </RemoveShoppingCartIcon>
            ) : (
              <AddShoppingCartIcon
                variant="primary"
                onClick={() =>
                  dispatch({
                    type: "ADD_TO_CART",
                    payload: prod,
                  })
                }
                style={{color: '#2dace4'}}
              >
              </AddShoppingCartIcon>
            )}
            <MonetizationOnIcon
              variant="success"
              onClick={handleBuyNowClick}
              className="ms-2"
              style={{ marginLeft: "20px", color: 'green' }}
            >
            </MonetizationOnIcon>
          </div>
        )}
      </Card.Body>
      
    </Card>
  );
};

export default SingleProduct;

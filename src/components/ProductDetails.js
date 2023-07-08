import React, { useState } from 'react';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { CartState } from '../context/Context';
import { useHistory } from "react-router-dom";
import Rating from "./Rating";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import SingleProduct from './SingleProduct';
import { Link, useNavigate } from 'react-router-dom'

const ProductDetails = () => {
  const { state: { cart }, dispatch } = CartState();
  const { productId } = useParams();
  const { state: { products } } = CartState();
  const product = products.find((prod) => prod.id === productId);
  const history = useHistory();
  const [selectedImage, setSelectedImage] = useState(product.image);
    const [showFullText, setShowFullText] = useState(false);
  const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce auctor luctus sapien id congue. Nulla facilisi. Nunc efficitur nunc ac bibendum vestibulum. Suspendisse potenti"

  const handleBuyNowClick = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });
    history.push(`/buynow/${product.id}`);
  };
  const handleToggleText = () => {
    setShowFullText(!showFullText);
  };

  // Function to filter similar products
const getSimilarProducts = () => {
  if (product) {
    return products.filter((prod) => {
      const productChars = product.name.toLowerCase().split('');
      const prodChars = prod.name.toLowerCase().split('');
      let similarCount = 0;
      let differentCount = 0;

      for (let i = 0; i < productChars.length; i++) {
        if (prodChars.includes(productChars[i])) {
          similarCount++;
        }
        else{
          differentCount++;
        }
        
      }

      return similarCount >= differentCount;
    });
  }
  return [];
};

  // Function to filter different products
  const getDifferentProducts = () => {
    if (product) {
      return products.filter((prod) => prod.name !== product.name);
    }
    return [];
  };

  const similarProducts = getSimilarProducts();
  const differentProducts = getDifferentProducts();

  return (
    <>
      <hr />
      <div className="container">
        <h5>{product && product.name}</h5>
      <div className="row">

      <div className="col-md-4">
    <div style={{ maxHeight: '600px', overflow: '' }}>
      <img
        src={selectedImage}
        alt="product-photo"
        style={{ objectFit: 'contain', width: '100%', height: '100%' }}
        className='img-fluid'
      />
    </div>
  </div>
<div className='col-md-6'>
    <div>
      {!product.inStock ? (
        <p className="text-danger">Out of Stock</p>
      ) : (
        <div className="d-flex justify-content-center">
          {cart.some((p) => p.id === product.id) ? (
            <><RemoveShoppingCartIcon
                        variant="danger"
                        onClick={() => dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: product,
                        })}
                        style={{ color: 'red' }} /></>
          ) : (
            <><AddShoppingCartIcon
                          variant="primary"
                          onClick={() => dispatch({
                            type: "ADD_TO_CART",
                            payload: product,
                          })}
                          style={{ color: '#2dace4' }} /></>
          )}
          <MonetizationOnIcon
            variant="success"
            onClick={handleBuyNowClick}
            className="ms-2"
            style={{ marginLeft: "20px", color: 'green' }}
          />
        </div>
      )}
    </div>

    <div>
      <span style={{ marginRight: "10px", color: "blue" }}>
        <a style={{color: '#2dace4'}} href='#'>visit store</a>
      </span>
      <span style={{ marginRight: "10px" }}>
        <a style={{ color: "green" }} href='#'>rating</a>
      </span>
      <span style={{ marginRight: "10px" }}>
        <a style={{ color: "green" }} href="#">reviews</a>
      </span>
      <span>
        <a style={{ color: "purple" }} href="#">FAQ</a>
      </span>
    </div>

    <div>
      <p style={{ fontWeight: "bold" }}>Tshs. {product && product.price.split(".")[0]}</p>
      <span>
        <a href="#/message" style={{ color: "purple" }}>bargain price</a>
      </span>
    </div>

    <div>
      <span>Can be returned after purchase:</span>
      <span style={{ color: "green" }}>yes</span>
    </div>

    <div>
      <p style={{ fontWeight: "bold" }}>Product Details</p>
      <div>
        {product && product.description}
      </div>
    </div>

    <div>
      <p style={{ fontWeight: 'bold' }}>About this Product</p>
      <div>
        {showFullText ? (
          <p style={{ fontStyle: "italic" }}>{text}</p>
        ) : (
          <p style={{ fontStyle: "italic" }}>{text.split(' ').slice(0, 20).join(' ')}</p>
        )}
        <a onClick={handleToggleText} style={{ color: "blue", cursor: "pointer" }}>
          {showFullText ? 'Read Less' : 'Read More'}
        </a>
              </div>
              </div>
              </div>

              <div className='col-md-2'>
              <Button
              type="button"
              variant='default'
              disabled={cart.length === 0}
              as={Link}
              to={{
                pathname: "/cart",
              }}
              style={{backgroundColor: '#2dace4'}}
            >
             Go to Cart
            </Button>
              </div>
</div>
<hr/>
      </div>

      <Container>
      <hr />
  <h5 className='container'>Similar Products</h5>
  <Row>
    {similarProducts.slice(0, 10).map((prod) => (
      <Col key={prod.id} lg={3} md={4} xs={6}>
        <SingleProduct prod={prod} />
        <br />
      </Col>
    ))}
  </Row>

  <hr />
  <h5>Other Products</h5>
  <hr />
  <Row>
    {differentProducts.slice(0, 10).map((prod) => (
      <Col key={prod.id} lg={3} md={4} xs={6}>
        <SingleProduct prod={prod} />
        <br />
      </Col>
    ))}
  </Row>

  <hr />
  <h5>Reviews</h5>
</Container>

    </>
  );
};

export default ProductDetails;

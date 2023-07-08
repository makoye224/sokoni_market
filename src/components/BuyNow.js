import React from 'react';
import { useParams } from 'react-router-dom';
import { CartState } from '../context/Context';
import { Link } from "react-router-dom";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";

const BuyNow = () => {
  const { productId } = useParams();
  const { state: { products } } = CartState();

  const product = products.find((prod) => prod.id === productId);

  return (
    <div className='container'>
      {/* Render the details of the product */}
      {product && (
        <Row className="my-5">
          <Col md={4}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={8}>
            <h2>{product.name}</h2>
            <p>Price: Tshs. {product && product.price.split(".")[0]}</p>
            {/* Add more product details */}
            <p>Description: {product.description}</p>
          </Col>
        </Row>
      )}

      <Row className="my-5 justify-content-center">
        <Col md={4}>
          <Button
            type="button"
            disabled={product.qty === 0}
            as={Link}
            to={{
              pathname: "/checkout",
              state: { total: product.price }, 
            }}
            className="w-100"
            style={{backgroundColor: '#2dace4'}}
          >
            Proceed to Checkout
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default BuyNow;

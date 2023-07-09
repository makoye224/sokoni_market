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
            <h5>Price: Tshs. {product && product.price.split(".")[0]}</h5>
            <p>Description: {product.description}</p>
            <Button
            type="button"
            disabled={product.qty === 0}
            as={Link}
            variant='default'
            to={{
              pathname: "/checkout",
              state: { total: Number(product.price)}, 
            }}
            style={{backgroundColor: '#2dace4', borderRadius: '1rem', color: "white"}}
          >
            Proceed to Checkout
          </Button>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default BuyNow;

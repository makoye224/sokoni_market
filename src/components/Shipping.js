import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Shipping = () => {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Process shipping information logic here
  };

  return (
    <div className="container">
      <h2>Shipping Information</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="fullName">
          <Form.Label>Full Name:</Form.Label>
          <Form.Control
            type="text"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="address">
          <Form.Label>Address:</Form.Label>
          <Form.Control
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City:</Form.Label>
          <Form.Control
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="state">
          <Form.Label>State:</Form.Label>
          <Form.Control
            type="text"
            value={state}
            onChange={(event) => setState(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="zipCode">
          <Form.Label>Zip Code:</Form.Label>
          <Form.Control
            type="text"
            value={zipCode}
            onChange={(event) => setZipCode(event.target.value)}
          />
        </Form.Group>
        <Button variant="default" type="submit" style={{backgroundColor: '#2dace4'}}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Shipping;

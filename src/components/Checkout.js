import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";
import CardPayment from "./CardPayment";
import MobilePayment from "./MobilePayment";
import PayPal from "./PayPal";
import Shipping from "./Shipping";

const Checkout = () => {
  const { state: { total } } = useLocation(); // Retrieve total value from location state

  const [paymentMethod, setPaymentMethod] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Paid with:", paymentMethod);
    // Perform payment processing or other actions here
  };

  const isMobileMoneyPayment =
    paymentMethod !== "Credit Card" &&
    paymentMethod !== "Debit Card" &&  
    paymentMethod !== "PayPal";

  const isPayPal = paymentMethod === "PayPal"; // Fixed the condition

  const isCard = !isMobileMoneyPayment && !isPayPal;

  return (
    <>
    <hr/>
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 container">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Order Summary</th>
                <th>Tshs.</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Subtotal</td>
                <td>{total}</td>
                <td></td>
              </tr>
              <tr>
                <td>2</td>
                <td>Tax</td>
                <td>{total * 0.08}</td>
                <td></td>
              </tr>
              <tr>
                <td>3</td>
                <td>Shipping</td>
                <td>4000</td>
                <td></td>
              </tr>
              <tr>
                <td>4</td>
                <td>Grand Total</td>
                <td style={{ color: "green" }}>
                  {total + total * 0.18 + 4000}
                </td>
                <td></td>
              </tr>
            </tbody>
          </Table>

          <div className="container">
            <Shipping/>
          </div>
        </div>

        <div className="col-md-6 container">
          <h4 className='container'>Please Enter Your Payment Method</h4>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="paymentMethod">
              <Form.Label className='container'>Select Payment Method:</Form.Label>
              <Form.Control
                as="select"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              >
                <option value="">-- Select --</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Mpesa">Mpesa</option>
                <option value="Airtel Money">Airtel Money</option>
                <option value="Tigo Pesa">Tigo Pesa</option>
                <option value="Halo Pesa">Halo Pesa</option>
                <option value="PayPal">PayPal</option>
              </Form.Control>
            </Form.Group>

            {isMobileMoneyPayment ? (
              <Form.Group controlId="mobileMoneyForm">
                <MobilePayment />
              </Form.Group>
            ) : isCard ? ( // Fixed the condition
              <Form.Group controlId="creditCardForm">
                <CardPayment />
              </Form.Group>
            ) : isPayPal ? ( // Fixed the condition
              <Form.Group controlId="payPalForm">
                <PayPal />
              </Form.Group>
            ) : null}
            
          </Form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Checkout;

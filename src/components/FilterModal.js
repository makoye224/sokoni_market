
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Filters from './Filters';

const FilterModal = () => {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <Button variant="#2dace4" style={{backgroundColor: '#2dace4'}} onClick={handleShow}>
      Filter Products
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Filter Products</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Filters/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="default" onClick={handleClose} style={{backgroundColor: '#2dace4'}}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}

export default FilterModal

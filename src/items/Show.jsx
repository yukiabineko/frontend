import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

/**************************************************************************************** */
const Show = (props)=>{
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return(
    <>
      <Modal
         show={show}
         onHide={handleClose}
         backdrop="static"
         keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
        </Modal.Body>
      </Modal>
    </>
   )
}
export default Show
/***************************************************************************************************** */
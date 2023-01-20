import React,{useState} from 'react'
import {Modal, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function Room({room,checkin,checkout}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className='row boxshadow'>
         <div className='col-md-4'>
            <img src={room.images[0]} className="imagelogo"/>
         </div> 
        <div className='col-md-7'>
            <h1>Room Number:{room.roomNumber}</h1>
            <p>Guests :{room.maxPeople}</p>
            <p>Rent(€) :{room.roomPerDay}</p>
            <div style={{float:'right'}}>
              {(checkin && checkout) && (
                <Link to={`/reserve/${room._id}/${checkin}/${checkout}`}>
                <button className='btn btn-primary m-3'>Reserve</button>
                </Link>
              )}
              <button className='btn btn-primary' onClick={handleShow}>Details</button>
            </div>
        </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Room Number: {room.roomNumber}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{room.description}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Room
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ParcelDetailModal = ({ parcel, show, handleClose, onUpdateStatus }) => {
  const [status, setStatus] = useState(parcel.status || 'Pending');

  useEffect(() => {
    setStatus(parcel.status || 'Pending');
  }, [parcel]);

  const handleUpdate = () => {
    onUpdateStatus(parcel._id, status);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="md">
      <Modal.Header closeButton>
        <Modal.Title>Parcel {parcel.id || parcel._id} Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Sender:</strong> {parcel.user?.username || parcel.user || 'Unknown'}</p>
        <p><strong>Recipient:</strong> {parcel.recipientName || 'N/A'}</p>
        <p><strong>Pickup Address:</strong> {parcel.pickupAddress || 'N/A'}</p>
        <p><strong>Delivery Address:</strong> {parcel.address}</p>
        <p><strong>Contact:</strong> {parcel.contact || 'N/A'}</p>
        <p><strong>Created:</strong> {new Date(parcel.createdAt || parcel.updatedAt).toLocaleString()}</p>
        <p><strong>Last Updated:</strong> {parcel.updatedAt ? new Date(parcel.updatedAt).toLocaleString() : 'N/A'}</p>
        <Form.Group controlId="statusSelect">
          <Form.Label>Update Status</Form.Label>
          <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>Pending</option>
            <option>In Transit</option>
            <option>Delivered</option>
          </Form.Select>
        </Form.Group>
        <hr />
        <h6>Status History</h6>
        <ul style={{ maxHeight: 150, overflowY: 'auto' }}>
          {(parcel.history || []).map((event, idx) => (
            <li key={idx}>
              {event.status} - {new Date(event.date).toLocaleString()}
            </li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        {onUpdateStatus && <Button variant="primary" onClick={handleUpdate}>Update</Button>}
      </Modal.Footer>
    </Modal>
  );
};

export default ParcelDetailModal;

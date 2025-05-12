
import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { toast } from 'react-toastify';
import Sidebar from '../components/Sidebar';
import ParcelCard from '../components/ParcelCard';
import ParcelTracker from '../components/ParcelTracker';
import { Card, Carousel, Row, Col } from 'react-bootstrap';

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const [sidebarItem, setSidebarItem] = useState('dashboard-home');
  const [parcels, setParcels] = useState([]);
  const [pickupAddress, setPickupAddress] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [selectedParcel, setSelectedParcel] = useState(null);

  const fetchParcels = async () => {
    try {
      const { data } = await api.get('/parcels');
      setParcels(data);
    } catch {
      toast.error('Failed to fetch parcels');
    }
  };

  useEffect(() => {
    fetchParcels();
  }, []);

  const handleCreateParcel = async e => {
    e.preventDefault();
    if (!pickupAddress.trim() || !deliveryAddress.trim() || !contactNo.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    try {
      await api.post('/parcels', {
        pickupAddress,
        address: deliveryAddress,
        contact: contactNo,
      });
      toast.success('Parcel created and confirmation email sent!');
      setPickupAddress('');
      setDeliveryAddress('');
      setContactNo('');
      fetchParcels();
      setSidebarItem('view-parcels');
    } catch {
      toast.error('Failed to create parcel');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const sidebarItems = [
    { key: 'dashboard-home', label: 'Dashboard Home' },
    { key: 'create-parcel', label: 'Create Parcel' },
    { key: 'view-parcels', label: 'View Parcels' },
  ];

  // Stats Calculations
  const totalParcels = parcels.length;
  const deliveredCount = parcels.filter(p => p.status === 'Delivered').length;
  const inTransitCount = parcels.filter(p => p.status === 'In Transit').length;

  return (
    <div className="d-flex" style={{ minHeight: '85vh', paddingTop: 20 }}>
      <Sidebar
        items={sidebarItems}
        selectedKey={sidebarItem}
        onSelect={setSidebarItem}
        onLogout={handleLogout}
      />
      <main
        className="flex-grow-1 bg-light p-4 rounded ms-3 overflow-auto"
        style={{ maxHeight: '80vh' }}
      >
        <h4 className="mb-4">User Dashboard</h4>

        {sidebarItem === 'dashboard-home' && (
          <>
            <Row className="g-4 mb-4">
              <Col md={4}>
                <Card bg="primary" text="white" className="text-center shadow-sm">
                  <Card.Body>
                    <Card.Title>Total Parcels</Card.Title>
                    <Card.Text className="display-5 fw-bold">{totalParcels}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card bg="success" text="white" className="text-center shadow-sm">
                  <Card.Body>
                    <Card.Title>Delivered</Card.Title>
                    <Card.Text className="display-5 fw-bold">{deliveredCount}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card bg="info" text="dark" className="text-center shadow-sm">
                  <Card.Body>
                    <Card.Title>In Transit</Card.Title>
                    <Card.Text className="display-5 fw-bold">{inTransitCount}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Carousel fade controls indicators interval={3000} className="rounded shadow">
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  style={{ maxHeight: 300, objectFit: 'cover' }}
                  src="https://img.freepik.com/free-photo/top-view-map-blue-background_23-2148786160.jpg?uid=R199325828&ga=GA1.1.1347945932.1746701025&w=740"
                  alt="Easy Parcel Creation"
                />
                <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-2">
                  <h3>Easy Parcel Creation</h3>
                  <p>Create and manage your parcel deliveries seamlessly.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  style={{ maxHeight: 300, objectFit: 'cover' }}
                  src="https://img.freepik.com/free-photo/still-life-supply-chain-representation_23-2149827282.jpg?uid=R199325828&ga=GA1.1.1347945932.1746701025&semt=ais_hybrid&w=740"
                  alt="Live Tracking"
                />
                <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-2">
                  <h3>Live Parcel Tracking</h3>
                  <p>Monitor your deliveries at every stage in real time.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  style={{ maxHeight: 300, objectFit: 'cover' }}
                  src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80"
                  alt="Customer Support"
                />
                <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-2">
                  <h3>Reliable Customer Support</h3>
                  <p>We’re always here to help when you need us.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </>
        )}

        {sidebarItem === 'create-parcel' && (
          <form onSubmit={handleCreateParcel}>
            <div className="mb-3">
              <label htmlFor="pickupAddress" className="form-label">Pickup Address</label>
              <input
                type="text"
                className="form-control"
                id="pickupAddress"
                placeholder="Enter pickup address"
                value={pickupAddress}
                onChange={e => setPickupAddress(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="deliveryAddress" className="form-label">Delivery Address</label>
              <input
                type="text"
                className="form-control"
                id="deliveryAddress"
                placeholder="Enter delivery address"
                value={deliveryAddress}
                onChange={e => setDeliveryAddress(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="contactNo" className="form-label">Contact Number</label>
              <input
                type="tel"
                className="form-control"
                id="contactNo"
                placeholder="Enter contact number"
                value={contactNo}
                onChange={e => setContactNo(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Create Parcel
            </button>
          </form>
        )}

        {sidebarItem === 'view-parcels' && (
          <>
            {parcels.length === 0 ? (
              <p>You haven’t created any parcels yet.</p>
            ) : selectedParcel === null ? (
              parcels.map(parcel => (
                <ParcelCard
                  key={parcel._id}
                  parcel={parcel}
                  onView={() => setSelectedParcel(parcel)}
                />
              ))
            ) : (
              <ParcelTracker
                parcel={selectedParcel}
                goBack={() => setSelectedParcel(null)}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;

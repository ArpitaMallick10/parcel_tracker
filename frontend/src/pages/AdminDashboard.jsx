
import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { toast } from 'react-toastify';
import Sidebar from '../components/Sidebar';
import ParcelCard from '../components/ParcelCard';
import ParcelDetailModal from '../components/ParcelDetailModal';
import { Card, Carousel, Row, Col } from 'react-bootstrap';

const AdminDashboard = () => {
  const [sidebarItem, setSidebarItem] = useState('dashboard-home');
  const [parcels, setParcels] = useState([]);
  const [selectedParcel, setSelectedParcel] = useState(null);

  // Fetch parcels
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

  const updateParcelStatus = async (parcelId, newStatus) => {
    try {
      await api.put(`/parcels/${parcelId}/status`, { status: newStatus });
      toast.success('Parcel status updated!');
      fetchParcels();
      setSelectedParcel(null);
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const sidebarItems = [
    { key: 'dashboard-home', label: 'Dashboard Home' },
    { key: 'all-parcels', label: 'All Parcels' },
    { key: 'logout', label: 'Logout' },
  ];

  // Summary Stats
  const totalParcels = parcels.length;
  const inTransitCount = parcels.filter(p => p.status === 'In Transit').length;
  const deliveredCount = parcels.filter(p => p.status === 'Delivered').length;

  return (
    <div className="d-flex" style={{ minHeight: '85vh', paddingTop: 20 }}>
      <Sidebar
        items={sidebarItems}
        selectedKey={sidebarItem}
        onSelect={key => {
          if (key === 'logout') handleLogout();
          else {
            setSidebarItem(key);
            setSelectedParcel(null);
          }
        }}
      />
      <main className="flex-grow-1 bg-light p-4 rounded ms-3 overflow-auto" style={{ maxHeight: '80vh' }}>
        <h4 className="mb-4">Admin Dashboard</h4>
        {sidebarItem === 'dashboard-home' && (
          <>
            <Row className="g-4">
              <Col md={4}>
                <Card bg="primary" text="white" className="shadow-sm text-center">
                  <Card.Body>
                    <Card.Title>Total Parcels</Card.Title>
                    <Card.Text className="display-5 fw-bold">{totalParcels}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card bg="info" text="dark" className="shadow-sm text-center">
                  <Card.Body>
                    <Card.Title>In Transit</Card.Title>
                    <Card.Text className="display-5 fw-bold">{inTransitCount}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card bg="success" text="white" className="shadow-sm text-center">
                  <Card.Body>
                    <Card.Title>Delivered</Card.Title>
                    <Card.Text className="display-5 fw-bold">{deliveredCount}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Carousel fade controls={false} indicators interval={3000} className="rounded shadow mt-4">
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  style={{ maxHeight: 300, objectFit: 'cover' }}
                  src="https://img.freepik.com/free-photo/still-life-supply-chain-representation_23-2149827282.jpg?uid=R199325828&ga=GA1.1.1347945932.1746701025&semt=ais_hybrid&w=740"
                  alt="Parcel Management"
                />
                <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-2">
                  <h3>Parcel Management</h3>
                  <p>Manage all parcels effortlessly from one dashboard.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  style={{ maxHeight: 300, objectFit: 'cover' }}
                  src="https://img.freepik.com/free-photo/top-view-map-blue-background_23-2148786160.jpg?uid=R199325828&ga=GA1.1.1347945932.1746701025&w=740"
                  alt="Real Time Updates"
                />
                <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-2">
                  <h3>Real-Time Status Updates</h3>
                  <p>Update and track parcel statuses in real time.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  style={{ maxHeight: 300, objectFit: 'cover' }}
                  src="https://img.freepik.com/free-photo/mobile-app-location-digital-art_23-2151762839.jpg?uid=R199325828&ga=GA1.1.1347945932.1746701025&semt=ais_hybrid&w=740"
                  alt="Team Coordination"
                />
                <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-2">
                  <h3>Team Coordination</h3>
                  <p>Keep your delivery teams well-coordinated.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </>
        )}

        {sidebarItem === 'all-parcels' && (
          <>
            {parcels.length === 0 ? (
              <p>No parcels available.</p>
            ) : selectedParcel === null ? (
              parcels.map(parcel => (
                <ParcelCard
                  key={parcel._id}
                  parcel={parcel}
                  isAdmin={true}
                  onStatusChange={updateParcelStatus}
                  onView={() => setSelectedParcel(parcel)}
                />
              ))
            ) : (
              <ParcelDetailModal
                parcel={selectedParcel}
                show={true}
                handleClose={() => setSelectedParcel(null)}
                onUpdateStatus={updateParcelStatus}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;

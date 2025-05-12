import React from 'react';
import { Container, Row, Col, Button, Card, Carousel } from 'react-bootstrap';

const features = [
  {
    title: 'Easy Parcel Creation',
    description: 'Quickly create parcel delivery requests and manage them seamlessly.',
    icon: '📦',
  },
  {
    title: 'Real-Time Tracking',
    description: 'Track your parcels live with detailed status updates and timelines.',
    icon: '📍',
  },
  {
    title: 'Efficient Admin Controls',
    description: 'Admins can effortlessly update delivery statuses and monitor parcels.',
    icon: '🛠️',
  },
];

const Home = () => {
  return (
    <>
      {/* Hero section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #6b73ff 0%, #000dff 100%)',
          color: 'white',
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '2rem 1rem',
        }}
      >
        <Container>
          <h1 className="display-4 fw-bold mb-3">Welcome to Parcel Delivery Tracker</h1>
          <p className="lead mb-4">
            Track your parcels with ease and get real-time delivery updates anytime, anywhere.
          </p>
          <div>
            <Button href="/signup" size="lg" variant="light" className="me-3">
              Get Started
            </Button>
            <Button href="/login" size="lg" variant="outline-light">
              Login
            </Button>
          </div>
        </Container>
      </section>

      {/* Features section */}
      <Container className="py-5">
        <Row className="text-center g-4">
          {features.map(({ title, description, icon }, idx) => (
            <Col key={idx} md={4}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Body>
                  <div
                    style={{
                      fontSize: '3rem',
                    }}
                    aria-hidden="true"
                  >
                    {icon}
                  </div>
                  <Card.Title className="mt-3 mb-2">{title}</Card.Title>
                  <Card.Text>{description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Carousel section */}
      <Container fluid className="bg-light py-5">
        <Container>
          <Carousel fade controls indicators interval={3000}>
            <Carousel.Item>
              <img
                className="d-block w-100 rounded"
                src="https://img.freepik.com/free-photo/mobile-app-location-digital-art_23-2151762839.jpg?uid=R199325828&ga=GA1.1.1347945932.1746701025&semt=ais_hybrid&w=740"
                alt="Fast Delivery"
                style={{ maxHeight: 400, objectFit: 'cover' }}
              />
              <Carousel.Caption>
                <h3>Fast and Reliable Delivery</h3>
                <p>Our fleet ensures parcels reach you on time, every time.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 rounded"
                src="https://img.freepik.com/free-photo/still-life-supply-chain-representation_23-2149827282.jpg?uid=R199325828&ga=GA1.1.1347945932.1746701025&semt=ais_hybrid&w=740"
                alt="Track Easily"
                style={{ maxHeight: 400, objectFit: 'cover' }}
              />
              <Carousel.Caption>
                <h3>Track Your Parcels Live</h3>
                <p>Follow each step from pick-up to delivery in real time.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 rounded"
                src="https://img.freepik.com/free-photo/top-view-map-blue-background_23-2148786160.jpg?uid=R199325828&ga=GA1.1.1347945932.1746701025&w=740"
                alt="Customer Support"
                style={{ maxHeight: 400, objectFit: 'cover' }}
              />
              <Carousel.Caption>
                <h3>Excellent Customer Support</h3>
                <p>We are here to help with any questions or concerns you have.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Container>
      </Container>
    </>
  );
};

export default Home;

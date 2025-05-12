// src/components/Footer.jsx
import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => (
  <footer
    style={{
      backgroundColor: '#222538',
      color: '#bbb',
      padding: '1rem 0',
      textAlign: 'center',
      marginTop: 'auto',
    }}
  >
    <Container>
      <p>
        Contact us: support@parceltracker.com | +1 (555) 123-4567 | 123 Parcel St, Cityville
      </p>
      <div style={{ fontSize: '2rem' }} aria-hidden="true" className="mb-2">
        🚚 ✉️ 📦
      </div>
      <p>&copy; 2024 Parcel Delivery Tracker. All rights reserved.</p>
    </Container>
  </footer>
);

export default Footer;

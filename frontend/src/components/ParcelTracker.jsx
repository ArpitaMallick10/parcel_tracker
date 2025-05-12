import React from 'react';

const ParcelTracker = ({ parcel, goBack }) => {
  const stages = ['Pending', 'In Transit', 'Delivered'];
  const currentIndex = stages.indexOf(parcel.status);

  return (
    <div>
      <button className="btn btn-secondary mb-3" onClick={goBack}>← Back to Parcels</button>
      <h5>Parcel ID: {parcel._id}</h5>
      <p><strong>Pickup Address:</strong> {parcel.pickupAddress}</p>
      <p><strong>Delivery Address:</strong> {parcel.address}</p>
      <p><strong>Contact:</strong> {parcel.contact}</p>

      <div className="d-flex justify-content-between mt-4 px-1" style={{ maxWidth: 600 }}>
        {stages.map((stage, idx) => {
          const isActive = idx <= currentIndex;
          return (
            <div key={stage} className="text-center flex-fill position-relative">
              <div
                className={`rounded-circle mx-auto ${isActive ? 'bg-primary' : 'bg-secondary'}`}
                style={{ width: 30, height: 30 }}
              />
              <small className={`d-block mt-2 ${isActive ? 'text-primary fw-bold' : 'text-muted'}`}>
                {stage}
              </small>
              {idx < stages.length - 1 && (
                <div
                  style={{
                    position: 'absolute',
                    top: '15px',
                    right: 0,
                    width: '100%',
                    height: 4,
                    backgroundColor: isActive ? '#0d6efd' : '#6c757d',
                    zIndex: -1,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ParcelTracker;

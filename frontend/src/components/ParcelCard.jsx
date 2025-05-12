import React from 'react';
import PropTypes from 'prop-types';

const ParcelCard = ({ parcel, isAdmin, onStatusChange, onView }) => {
  const getBadgeClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'badge bg-warning text-dark';
      case 'In Transit':
        return 'badge bg-info text-dark';
      case 'Delivered':
        return 'badge bg-success';
      default:
        return 'badge bg-secondary';
    }
  };

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
        <div>
          <h5 className="card-title mb-1">Parcel {parcel.id || parcel._id}</h5>
          <p className="mb-1"><strong>Sender:</strong> {parcel.user?.username || parcel.user || 'Unknown'}</p>
          {parcel.recipientName && <p className="mb-1"><strong>Recipient:</strong> {parcel.recipientName}</p>}
          <p className="mb-1"><strong>Address:</strong> {parcel.address}</p>
          {parcel.pickupAddress && <p className="mb-1"><strong>Pickup:</strong> {parcel.pickupAddress}</p>}
          {parcel.contact && <p className="mb-1"><strong>Contact:</strong> {parcel.contact}</p>}
        </div>
        <div className="d-flex flex-column align-items-start align-items-md-end gap-2">
          <span className={getBadgeClass(parcel.status)}>{parcel.status}</span>
          <div className="btn-group">
            {onView && (
              <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                onClick={() => onView(parcel)}
              >
                View
              </button>
            )}
            {isAdmin && onStatusChange && (
              <select
                className="form-select form-select-sm"
                value={parcel.status}
                onChange={(e) => onStatusChange(parcel._id, e.target.value)}
                aria-label={`Update status for parcel ${parcel.id || parcel._id}`}
                style={{ minWidth: '120px' }}
              >
                <option>Pending</option>
                <option>In Transit</option>
                <option>Delivered</option>
              </select>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ParcelCard.propTypes = {
  parcel: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool,
  onStatusChange: PropTypes.func,
  onView: PropTypes.func,
};

ParcelCard.defaultProps = {
  isAdmin: false,
  onStatusChange: null,
  onView: null,
};

export default ParcelCard;

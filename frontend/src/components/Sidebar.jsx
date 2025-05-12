import React from 'react';

const Sidebar = ({ items, selectedKey, onSelect, onLogout }) => {
  return (
    <nav
      className="d-flex flex-column p-3 bg-dark text-white"
      style={{ minWidth: '220px', height: '100vh', position: 'sticky', top: '56px' }}
      aria-label="Sidebar navigation"
    >
      <h5 className="text-center mb-4">Menu</h5>
      <ul className="nav nav-pills flex-column gap-2" role="menu">
        {items.map(({ key, label }) => (
          <li key={key} className="nav-item" role="none">
            <button
              type="button"
              className={`nav-link btn btn-outline-light w-100 text-start ${selectedKey === key ? 'active' : ''}`}
              onClick={() => onSelect(key)}
              aria-current={selectedKey === key ? 'page' : undefined}
              role="menuitem"
            >
              {label}
            </button>
          </li>
        ))}
        {onLogout && (
          <li className="nav-item mt-auto pt-3 border-top" role="none">
            <button
              type="button"
              className="nav-link btn btn-outline-danger w-100 text-start"
              onClick={onLogout}
              role="menuitem"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Sidebar;

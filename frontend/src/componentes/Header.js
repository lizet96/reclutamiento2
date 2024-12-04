import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  // Funcionalidad de cerrar sesión que se agregará más tarde
  const handleLogout = () => {
    alert('Cerrar sesión'); // Placeholder para la funcionalidad de cerrar sesión
  };

  return (
    <div style={styles.headerContainer}>
      <div style={styles.headerContent}>
        <button onClick={handleLogout} style={styles.iconButton}>
          <FontAwesomeIcon icon={faLock} style={styles.icon} />
        </button>
      </div>
    </div>
  );
};

const styles = {
  headerContainer: {
    width: '100%',
    backgroundColor: '#000', // Fondo negro
    position: 'fixed',
    top: 0,
    
    left: 0,
    zIndex: 1000, // Asegura que el header esté siempre arriba
    padding: '10px 0',
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '0 20px',
  },
  iconButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  icon: {
    color: '#fff', // Icono blanco
    fontSize: '24px',
  },
};

export default Header;

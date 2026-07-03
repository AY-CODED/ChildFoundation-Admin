import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/Logo.png';

const SideBar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const baseMenuItemStyle = {
    textDecoration: 'none',
    display: 'block',
    padding: '10px',
    borderRadius: '4px',
    transition: 'all 0.2s ease',
  };

  const activeMenuItemStyle = {
    ...baseMenuItemStyle,
    backgroundColor: '#FDABB9',
    color: '#fff',
  };

  const inactiveMenuItemStyle = {
    ...baseMenuItemStyle,
    color: '#333',
  };

  return (
    <div className="sidebar" style={{ width: '250px', height: '100vh', backgroundColor: '#f8f9fa', padding: '20px', borderRight: '1px solid #dee2e6' }}>
      <div className="logo" style={{ marginBottom: '40px' }}>
        <img src={Logo} alt="YMCH Logo" style={{ width: '100%', maxWidth: '150px' }} />
      </div>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '20px' }}>
            <Link to="/Home" style={isActive('/Home') ? activeMenuItemStyle : inactiveMenuItemStyle}>
              Overview
            </Link>
          </li>
          <li style={{ marginBottom: '20px' }}>
            <Link to="/ImageManagement" style={isActive('/ImageManagement') ? activeMenuItemStyle : inactiveMenuItemStyle}>
              Image Management
            </Link>
          </li>
          <li style={{ marginBottom: '20px' }}>
            <Link to="/User" style={isActive('/User') ? activeMenuItemStyle : inactiveMenuItemStyle}>
              User Directory
            </Link>
          </li>
          <li style={{ marginBottom: '20px' }}>
            <Link to="/settings" style={isActive('/settings') ? activeMenuItemStyle : inactiveMenuItemStyle}>
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
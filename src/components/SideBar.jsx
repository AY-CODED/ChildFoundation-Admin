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
            <Link to="/" style={isActive('/') ? activeMenuItemStyle : inactiveMenuItemStyle}>
              Dashboard
            </Link>
          </li>
          <li style={{ marginBottom: '20px' }}>
            <Link to="/beneficiaries" style={isActive('/beneficiaries') ? activeMenuItemStyle : inactiveMenuItemStyle}>
              Beneficiaries
            </Link>
          </li>
          <li style={{ marginBottom: '20px' }}>
            <Link to="/donations" style={isActive('/donations') ? activeMenuItemStyle : inactiveMenuItemStyle}>
              Donations
            </Link>
          </li>
          <li style={{ marginBottom: '20px' }}>
            <Link to="/programs" style={isActive('/programs') ? activeMenuItemStyle : inactiveMenuItemStyle}>
              Programs
            </Link>
          </li>
          <li style={{ marginBottom: '20px' }}>
            <Link to="/gallery" style={isActive('/gallery') ? activeMenuItemStyle : inactiveMenuItemStyle}>
              Gallery
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
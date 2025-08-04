import '../Styles/Layout.css';
import HeaderLogo from '../assets/images/HeaderLogo.jpg';
import { Navbar, Container, Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { logout } from '../auth/authService';

function Layout({ children }) {
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="app-layout">
      {/* Header Section */}
      <Navbar className="page-header" expand="lg">
        <Container fluid>
          <Navbar.Brand>
            <img src={HeaderLogo} alt="Logo" className="header-logo" />
          </Navbar.Brand>
          <Button variant="outline-secondary" className="menu-toggle d-lg-none">
            ☰
          </Button>
          <div className="ms-auto">
            <Button variant="outline-secondary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Container>
      </Navbar>

      <div className="body-container">
        {/* Sidebar Section */}
        <div className="sidebar open">
          <Nav className="sidebar-menu flex-column">
            <Nav.Link as={Link} to="/" className="menu-item">Home</Nav.Link>
            <Nav.Link as={Link} to="/return-inquiry" className="menu-item">Return Inquiry</Nav.Link>
            <Nav.Link as={Link} to="/customer-care-dashboard" className="menu-item">Customer Care Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/returns-dashboard" className="menu-item">Returns Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/user-registration" className="menu-item">User Registration</Nav.Link>
            {/* <Nav.Link className="menu-item" href="/">Home</Nav.Link>
            <Nav.Link className="menu-item" href="/return-inquiry">Return Inquiry</Nav.Link>
            <Nav.Link className="menu-item" href="/customer-care-dashboard">Customer Care Dashboard</Nav.Link>
            <Nav.Link className="menu-item" href="/returns-dashboard">Returns Dashboard</Nav.Link> */}
          </Nav>
        </div>

        {/* Main Content Area */}
        <main className="main-content">
          {children}
        </main>
      </div>

      {/* Footer Section */}
      {/* <footer className="app-footer">
        <Container fluid>
          <div className="footer-content">
            <span className="footer-text">
              © 2024 Komatsu Parts Portal. All rights reserved.
            </span>
            <span className="footer-version">
              Version 1.0.0
            </span>
          </div>
        </Container>
      </footer> */}
    </div>
  );
}

export default Layout;

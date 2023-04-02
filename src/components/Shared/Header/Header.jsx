import NavBar from '../Navbar/Navbar';

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ backgroundColor: '#e3f2fd' }}>
        <div className="container">
          <a className="navbar-brand" href="/#">
            <strong>Navbar</strong>
          </a>
          <button
            className="navbar-toggler"
            type="submit"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <NavBar />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

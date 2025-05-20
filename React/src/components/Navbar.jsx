import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__left">
          <Link to="/">Inicio</Link>
          <Link to="/diagnostico">Diagnóstico</Link>
        </div>
        <div className="navbar__right">
          <Link to="/carrito">🛒 Carrito</Link>
          <Link to="/login">Iniciar sesión</Link>
        </div>
      </div>
    </nav>
  );
}


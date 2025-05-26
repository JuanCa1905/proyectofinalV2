import { useContext, useState, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = useCallback(() => {
    if (!nombre.trim()) {
      setError("Por favor, ingresa tu nombre.");
      return;
    }

    if (login) {
      login(nombre);
      navigate("/");
    } else {
      setError("Función de login no disponible.");
    }
  }, [nombre, login, navigate]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <button className="btn-secundario" onClick={handleGoBack}>
          ← Regresar
        </button>
        <h2 className="login-title">Iniciar sesión</h2>
        <input
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
          className="login-input"
        />
        {error && <p className="login-error">{error}</p>}
        <button className="btn-principal" onClick={handleLogin}>
          Entrar
        </button>
      </div>
    </div>
  );
}

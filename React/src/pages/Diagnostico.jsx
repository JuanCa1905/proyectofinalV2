import { useState, useContext } from 'react';
import { diagnosticarEnfermedad } from '../services/diagnosticoService';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function Diagnostico() {
  const [imagen, setImagen] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const { usuario } = useContext(AuthContext);

  if (!usuario) {
    return <Navigate to="/login" />;
  }

  const handleAnalyze = async () => {
    if (!imagen) {
      setError("Por favor selecciona una imagen.");
      return;
    }

    setError(null);
    setResultado(null);
    setCargando(true);

    try {
      const data = await diagnosticarEnfermedad(imagen);
      const enfermedad = data.health_assessment.diseases[0];

      setResultado({
        nombre: enfermedad.name,
        descripcion: enfermedad.disease_details.description,
        recomendaciones: enfermedad.disease_details.treatment,
      });
    } catch (error) {
      console.error(error);
      setError("Hubo un error al procesar la imagen. Intenta nuevamente.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="diagnostico-container">
      <h1>Diagnóstico de Enfermedades</h1>

      <div className="diagnostico-form">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImagen(e.target.files[0])}
        />
        <button
          className="btn-diagnostico"
          onClick={handleAnalyze}
          disabled={cargando || !imagen}
        >
          {cargando ? 'Analizando...' : 'Analizar'}
        </button>
        {error && <p className="error-msg">{error}</p>}
      </div>

      {resultado && (
        <div className="diagnostico-resultado">
          <h2>{resultado.nombre}</h2>
          <p>{resultado.descripcion}</p>
          <p><strong>Tratamiento:</strong> {resultado.recomendaciones}</p>
        </div>
      )}
    </div>
  );
}

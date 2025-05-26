import { useState, useContext, useCallback } from 'react';
import { diagnosticarEnfermedad } from '../services/diagnosticoService';
import { AuthContext } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Diagnostico() {
  const [imagen, setImagen] = useState(null);
  const [resultados, setResultados] = useState([]);
  const [imagenesSimilares, setImagenesSimilares] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();

  if (usuario === undefined) return null;
  if (!usuario) return <Navigate to="/login" />;

  const handleAnalyze = async () => {
    if (!imagen) {
      setError("Por favor selecciona una imagen.");
      return;
    }

    setError(null);
    setResultados([]);
    setImagenesSimilares([]);
    setCargando(true);

    try {
      const data = await diagnosticarEnfermedad(imagen);
      const enfermedades = data?.health_assessment?.diseases || [];

      if (enfermedades.length > 0) {
        const resultadosProcesados = enfermedades.map((enfermedad) => ({
          nombre: enfermedad.name ?? "Desconocido",
          descripcion: enfermedad.disease_details?.description || "Sin descripción disponible.",
          recomendaciones: enfermedad.disease_details?.treatment?.prevention || ["No se encontraron recomendaciones."],

        }));

        setResultados(resultadosProcesados);

        // Mostrar imágenes similares de la primera enfermedad (opcional)
        const imagenes = enfermedades[0]?.similar_images?.slice(0, 3)?.map((img) => img.url) || [];
        setImagenesSimilares(imagenes);

      } else {
        setError("No se detectó ninguna enfermedad en la imagen.");
      }
    } catch (error) {
      console.error("Error en diagnóstico:", error);
      setError("Hubo un error al procesar la imagen. Intenta nuevamente.");
    } finally {
      setCargando(false);
    }
  };

  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className="diagnostico-container">
      <button className="btn-secundario" onClick={handleGoBack}>← Regresar</button>
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

      {resultados.length > 0 && (
        <div className="diagnostico-resultado">
          {resultados.map((enf, index) => (
            <div key={index} className="resultado-bloque">
              <h2>{enf.nombre}</h2>
              <p><strong>Descripción:</strong> {enf.descripcion}</p>
              <div>
                <strong>Tratamiento:</strong>
                  <ul>
                  {enf.recomendaciones.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
  </ul>
</div>

            </div>
          ))}

          {imagenesSimilares.length > 0 && (
            <div className="imagenes-similares">
              <h3>Imágenes similares:</h3>
              <div className="galeria">
                {imagenesSimilares.map((url, i) => (
                  <img key={i} src={url} alt={`Similar ${i}`} style={{ width: '150px', margin: '5px' }} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

import { createContext, useState, useEffect } from "react";

// ✅ Exporta el contexto
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const nombreGuardado = localStorage.getItem("usuario");
    if (nombreGuardado) {
      setUsuario(nombreGuardado);
    }
  }, []);

  const login = (nombre) => {
    setUsuario(nombre);
    localStorage.setItem("usuario", nombre);
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

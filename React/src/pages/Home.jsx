import '../styles/main.scss';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/productService';
import Navbar from '../components/Navbar';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categoria, setCategoria] = useState('Todas');
  const [busqueda, setBusqueda] = useState('');
  const [categoriasUnicas, setCategoriasUnicas] = useState([]);

  useEffect(() => {
    getProducts().then(data => {
      setProducts(data);
      const cats = [...new Set(data.map(p => p.category))];
      setCategoriasUnicas(cats);
    });
  }, []);

  const productosFiltrados = products.filter(p => {
    const coincideCategoria = categoria === 'Todas' || p.category === categoria;
    const coincideNombre = p.name.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideNombre;
  });

  return (
    <div className="home">
      <Navbar />

      <h1 className="titulo">Tienda de Plantas</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="Todas">Todas las categorías</option>
          {categoriasUnicas.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="products-grid">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="empty-message">No se encontraron productos.</p>
        )}
      </div>
    </div>
  );
}


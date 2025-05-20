import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-description">{product.description}</p>
      <p className="product-price">${product.price}</p>

      <Link to={`/product/${product.id}`}>
        <button className="btn-ver-mas">
          Ver más
        </button>
      </Link>
    </div>
  );
}

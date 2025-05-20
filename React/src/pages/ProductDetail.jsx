import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProducts } from '../services/productService';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    getProducts().then(products => {
      const found = products.find(p => p.id === parseInt(id));
      setProduct(found);
    });
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!product) {
    return <p className="product-loading">Cargando producto...</p>;
  }

  return (
    <div className="product-detail">
      <div className="product-card-detail">
        <button className="btn-back" onClick={handleGoBack}>← Regresar</button>

        <div className="product-info">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
          <div className="product-text">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-description">{product.description}</p>
            <p className="product-price">Precio: ${product.price}</p>

            <button
              onClick={() => addToCart(product)}
              className="btn-add"
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


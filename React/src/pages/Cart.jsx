import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, clearCart, total } = useCart();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
<div className="cart-container">
  <button onClick={handleGoBack} className="back-button">Regresar</button>
  <h2>Carrito de compras</h2>
  {cart.length === 0 ? (
    <p>Tu carrito está vacío</p>
  ) : (
    <>
      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-img" />
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p>Cantidad: {item.quantity || 1}</p>
              <p>Precio unitario: ${item.price}</p>
              <p>Subtotal: ${item.price * (item.quantity || 1)}</p>
              <button onClick={() => removeFromCart(item.id)} className="remove-btn">Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-total">
        <h3>Total: ${total}</h3>
        <button onClick={clearCart} className="clear-btn">Vaciar carrito</button>
      </div>
    </>
  )}
</div>

  );
};

export default Cart;
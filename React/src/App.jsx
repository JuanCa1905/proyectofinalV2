import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Diagnostico from "./pages/Diagnostico";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import './styles/main.scss';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/diagnostico" element={<Diagnostico />} />
            <Route path="/login" element={<Login />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/carrito" element={<Cart />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

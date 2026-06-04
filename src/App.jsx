import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import Landing from './pages/Landing'
import Carta from './pages/Carta'
import Nosotros from './pages/Nosotros'
import Ubicacion from './pages/Ubicacion'
import Carrito from './pages/Carrito'
import Checkout from './pages/Checkout'
import Admin from './pages/Admin'
import Login from './pages/Login'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import './index.css'

function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <Chatbot />
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout><Landing /></Layout>} />
            <Route path="/carta" element={<Layout><Carta /></Layout>} />
            <Route path="/nosotros" element={<Layout><Nosotros /></Layout>} />
            <Route path="/ubicacion" element={<Layout><Ubicacion /></Layout>} />
            <Route path="/carrito" element={<Layout><Carrito /></Layout>} />
            <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}
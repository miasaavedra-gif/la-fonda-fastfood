import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ShoppingCart, LogOut, User } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import logo from '../assets/logo.jpg'

export default function Navbar() {
  const { count } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const links = [
    ['Carta', '/carta'],
    ['Nosotros', '/nosotros'],
    ['Ubicación', '/ubicacion']
  ]

  return (
    <nav
      style={{
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2.5rem',
        height: '70px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        borderBottom: '1px solid #F5C800',
        boxShadow: '0 8px 24px rgba(0,0,0,.08)'
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.7rem'
        }}
      >
        <img
          src={logo}
          alt="La Fonda"
          style={{
            height: 44,
            width: 44,
            objectFit: 'cover',
            borderRadius: '50%',
            border: '2px solid #F5C800',
            boxShadow: '0 4px 12px rgba(245,200,0,.25)'
          }}
        />

        <span
          style={{
            fontFamily: 'Bebas Neue',
            fontSize: '1.55rem',
            color: '#111',
            letterSpacing: 1
          }}
        >
          La Fonda
        </span>
      </Link>

      <div style={{ display: 'flex', gap: '2.5rem' }}>
        {links.map(([label, path]) => (
          <Link
            key={label}
            to={path}
            style={{
              color: location.pathname === path ? '#111' : '#666',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.92rem',
              borderBottom: location.pathname === path ? '2px solid #F5C800' : '2px solid transparent',
              paddingBottom: '4px',
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#111'
              e.currentTarget.style.borderBottom = '2px solid #F5C800'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = location.pathname === path ? '#111' : '#666'
              e.currentTarget.style.borderBottom =
                location.pathname === path ? '2px solid #F5C800' : '2px solid transparent'
            }}
          >
            {label}
          </Link>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link
          to="/carrito"
          style={{
            position: 'relative',
            color: '#111',
            display: 'flex',
            padding: '9px',
            borderRadius: 10,
            background: '#FAFAFA',
            border: '1px solid #E8E8E8',
            transition: 'all 0.25s ease'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#FFFBEB'
            e.currentTarget.style.borderColor = '#F5C800'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = '#FAFAFA'
            e.currentTarget.style.borderColor = '#E8E8E8'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          <ShoppingCart size={22} />

          {count > 0 && (
            <span
              style={{
                position: 'absolute',
                top: -6,
                right: -6,
                background: '#F5C800',
                color: '#111',
                borderRadius: '50%',
                width: 20,
                height: 20,
                fontSize: '0.68rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                boxShadow: '0 4px 10px rgba(245,200,0,.35)'
              }}
            >
              {count}
            </span>
          )}
        </Link>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                background: '#FAFAFA',
                border: '1px solid #E8E8E8',
                borderRadius: 10,
                padding: '8px 12px'
              }}
            >
              <User size={15} color="#666" />
              <span style={{ color: '#333', fontSize: '0.82rem', fontWeight: 700 }}>
                {user.displayName || user.email?.split('@')[0]}
              </span>
            </div>

            <button
              onClick={() => signOut(auth)}
              style={{
                background: '#fff',
                border: '1px solid #E8E8E8',
                borderRadius: 10,
                padding: '8px 10px',
                color: '#999',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#111'
                e.currentTarget.style.borderColor = '#F5C800'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = '#999'
                e.currentTarget.style.borderColor = '#E8E8E8'
              }}
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            style={{
              background: 'linear-gradient(135deg,#F5C800,#FFD93D)',
              border: 'none',
              color: '#111',
              padding: '10px 22px',
              borderRadius: 10,
              fontWeight: 800,
              cursor: 'pointer',
              fontSize: '0.88rem',
              letterSpacing: 0.3,
              boxShadow: '0 8px 20px rgba(245,200,0,.25)',
              transition: 'all .2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(245,200,0,.35)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(245,200,0,.25)'
            }}
          >
            Ingresar
          </button>
        )}
      </div>
    </nav>
  )
}
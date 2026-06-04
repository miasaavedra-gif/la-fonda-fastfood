import { useCart } from '../context/CartContext'
import { Link, useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingCart, Utensils, ArrowRight } from 'lucide-react'

export default function Carrito() {
  const { cart, removeItem, updateQty, total } = useCart()
  const navigate = useNavigate()

  if (cart.length === 0) {
    return (
      <div
        style={{
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fff',
          padding: '4rem 2rem'
        }}
      >
        <div
          style={{
            textAlign: 'center',
            background: '#FAFAFA',
            border: '1px solid #E8E8E8',
            borderRadius: 20,
            padding: '3rem 2.5rem',
            maxWidth: 460,
            width: '100%',
            boxShadow: '0 12px 35px rgba(0,0,0,0.06)'
          }}
        >
          <div
            style={{
              width: 82,
              height: 82,
              borderRadius: '50%',
              background: '#FFFBEB',
              border: '2px solid #F5C800',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem'
            }}
          >
            <ShoppingCart size={38} color="#111" />
          </div>

          <h2
            style={{
              fontFamily: 'Bebas Neue',
              fontSize: '2.2rem',
              marginBottom: '0.5rem',
              color: '#111'
            }}
          >
            Tu carrito está vacío
          </h2>

          <p
            style={{
              color: '#777',
              fontSize: '0.95rem',
              lineHeight: 1.6,
              marginBottom: '1.5rem'
            }}
          >
            Agrega tus productos favoritos desde la carta y finaliza tu pedido directamente en la web.
          </p>

          <Link
            to="/carta"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'linear-gradient(135deg,#F5C800,#FFD93D)',
              color: '#111',
              padding: '12px 26px',
              borderRadius: 12,
              textDecoration: 'none',
              fontWeight: 800,
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
            Ver carta
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        background: '#fff',
        minHeight: '100vh',
        padding: '3rem 1.5rem'
      }}
    >
      <div style={{ maxWidth: 1050, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span
            style={{
              display: 'inline-block',
              background: '#FFFBEB',
              color: '#111',
              border: '1px solid #F5C800',
              padding: '5px 12px',
              borderRadius: 20,
              fontSize: '0.75rem',
              fontWeight: 800,
              marginBottom: '0.8rem'
            }}
          >
            Pedido web
          </span>

          <h1
            style={{
              fontFamily: 'Bebas Neue',
              fontSize: '2.8rem',
              marginBottom: '0.35rem',
              color: '#111'
            }}
          >
            Tu carrito
          </h1>

          <p style={{ color: '#777', fontSize: '0.95rem' }}>
            Revisa tus productos antes de continuar al pago.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 340px',
            gap: '2rem',
            alignItems: 'start'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {cart.map(item => (
              <div
                key={item.id}
                style={{
                  background: '#fff',
                  borderRadius: 16,
                  padding: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  border: '1px solid #E8E8E8',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
                  transition: 'all .2s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.08)'
                  e.currentTarget.style.borderColor = '#F5C800'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.05)'
                  e.currentTarget.style.borderColor = '#E8E8E8'
                }}
              >
                <div
  style={{
    width: 72,
    height: 72,
    borderRadius: 14,
    overflow: 'hidden',
    flexShrink: 0,
    background: '#FFFBEB',
    border: '1px solid #F5C800',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}
>
  {item.imagen ? (
    <img
      src={item.imagen}
      alt={item.nombre}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }}
    />
  ) : (
    <Utensils size={26} color="#111" />
  )}
</div>

                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, color: '#111', marginBottom: 4 }}>
                    {item.nombre}
                  </div>

                  <div style={{ color: '#666', fontSize: '0.85rem' }}>
                    Precio unitario: <strong style={{ color: '#111' }}>S/ {Number(item.precio).toFixed(2)}</strong>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: '#FAFAFA',
                    border: '1px solid #E8E8E8',
                    borderRadius: 10,
                    padding: '5px'
                  }}
                >
                  <button
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    style={{
                      background: '#fff',
                      border: '1px solid #E8E8E8',
                      borderRadius: 8,
                      width: 30,
                      height: 30,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Minus size={14} />
                  </button>

                  <span style={{ fontWeight: 900, width: 26, textAlign: 'center' }}>
                    {item.qty}
                  </span>

                  <button
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    style={{
                      background: '#F5C800',
                      border: '1px solid #F5C800',
                      borderRadius: 8,
                      width: 30,
                      height: 30,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <div
                  style={{
                    fontWeight: 900,
                    minWidth: 85,
                    textAlign: 'right',
                    color: '#111'
                  }}
                >
                  S/ {(Number(item.precio) * Number(item.qty)).toFixed(2)}
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  style={{
                    background: '#fff',
                    border: '1px solid #E8E8E8',
                    borderRadius: 10,
                    cursor: 'pointer',
                    color: '#999',
                    width: 36,
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all .2s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#E63B2E'
                    e.currentTarget.style.borderColor = '#E63B2E'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = '#999'
                    e.currentTarget.style.borderColor = '#E8E8E8'
                  }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div
            style={{
              background: '#fff',
              borderRadius: 18,
              padding: '1.5rem',
              border: '1px solid #E8E8E8',
              position: 'sticky',
              top: 90,
              boxShadow: '0 12px 35px rgba(0,0,0,0.07)'
            }}
          >
            <h3
              style={{
                fontFamily: 'Bebas Neue',
                fontSize: '1.55rem',
                marginBottom: '1rem',
                color: '#111'
              }}
            >
              Resumen del pedido
            </h3>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.65rem', color: '#666' }}>
              <span>Subtotal</span>
              <strong style={{ color: '#111' }}>S/ {total.toFixed(2)}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#666' }}>
              <span>Envío</span>
              <strong style={{ color: '#111' }}>S/ 5.00</strong>
            </div>

            <div
              style={{
                borderTop: '1px solid #E8E8E8',
                marginTop: '1rem',
                paddingTop: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                fontWeight: 900,
                fontSize: '1.2rem'
              }}
            >
              <span>Total</span>
              <span style={{ color: '#111' }}>S/ {(total + 5).toFixed(2)}</span>
            </div>

            <p
              style={{
                marginTop: '1rem',
                fontSize: '0.8rem',
                color: '#777',
                lineHeight: 1.6,
                background: '#FAFAFA',
                border: '1px solid #E8E8E8',
                borderRadius: 10,
                padding: '0.75rem'
              }}
            >
              Los pedidos se realizan exclusivamente desde nuestra web.
            </p>

            <button
              onClick={() => navigate('/checkout')}
              style={{
                width: '100%',
                marginTop: '1.25rem',
                background: 'linear-gradient(135deg,#F5C800,#FFD93D)',
                color: '#111',
                border: 'none',
                borderRadius: 12,
                padding: '15px',
                fontWeight: 900,
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(245,200,0,.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
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
              Continuar al pago
              <ArrowRight size={18} />
            </button>

            <Link
              to="/carta"
              style={{
                display: 'block',
                textAlign: 'center',
                marginTop: '0.9rem',
                color: '#777',
                fontSize: '0.86rem',
                textDecoration: 'none',
                fontWeight: 700
              }}
            >
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
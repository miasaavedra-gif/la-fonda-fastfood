import { Link } from 'react-router-dom'
import { MapPin, Phone, Clock, CalendarCheck } from 'lucide-react'

const RESERVA_WHATSAPP =
  'https://wa.me/51943358398?text=Hola,%20quiero%20reservar%20una%20mesa'

export default function Footer() {
  return (
    <footer
      style={{
        background: '#111',
        color: '#fff',
        padding: '3rem 2.5rem 2rem'
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'Bebas Neue',
                fontSize: '1.8rem',
                color: '#F5C800',
                marginBottom: '0.5rem'
              }}
            >
              La Fonda
            </div>

            <p
              style={{
                color: '#aaa',
                fontSize: '0.88rem',
                lineHeight: 1.7
              }}
            >
              Fast food artesanal en Chaclacayo. Pedidos exclusivamente desde nuestra web y reservas de mesa por WhatsApp.
            </p>
          </div>

          <div>
            <div
              style={{
                fontFamily: 'Bebas Neue',
                fontSize: '1.1rem',
                color: '#F5C800',
                marginBottom: '1rem',
                letterSpacing: 1
              }}
            >
              Navegación
            </div>

            {[['Carta', '/carta'], ['Nosotros', '/nosotros'], ['Ubicación', '/ubicacion']].map(([l, p]) => (
              <Link
                key={l}
                to={p}
                style={{
                  display: 'block',
                  color: '#aaa',
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  marginBottom: '0.5rem',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#F5C800'}
                onMouseLeave={e => e.currentTarget.style.color = '#aaa'}
              >
                {l}
              </Link>
            ))}
          </div>

          <div>
            <div
              style={{
                fontFamily: 'Bebas Neue',
                fontSize: '1.1rem',
                color: '#F5C800',
                marginBottom: '1rem',
                letterSpacing: 1
              }}
            >
              Contacto
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', color: '#aaa', fontSize: '0.88rem' }}>
                <MapPin size={17} color="#F5C800" />
                <span>MZ F1 LT 12 Alfonso Cobian, Chaclacayo</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#aaa', fontSize: '0.88rem' }}>
                <Phone size={17} color="#F5C800" />
                <span>+51 943 358 398</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#aaa', fontSize: '0.88rem' }}>
                <Clock size={17} color="#F5C800" />
                <span>5:00 PM – 11:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid #222',
            paddingTop: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <span style={{ color: '#666', fontSize: '0.82rem' }}>
            © 2026 La Fonda Fast Food — Todos los derechos reservados
          </span>

          <a
            href={RESERVA_WHATSAPP}
            target="_blank"
            rel="noreferrer"
            style={{
              background: '#F5C800',
              color: '#111',
              padding: '9px 18px',
              borderRadius: 10,
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 8px 20px rgba(245,200,0,0.25)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(245,200,0,0.35)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(245,200,0,0.25)'
            }}
          >
            <CalendarCheck size={17} />
            Reservar Mesa
          </a>
        </div>
      </div>
    </footer>
  )
}
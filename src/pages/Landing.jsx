import { Link } from 'react-router-dom'
import { ArrowRight, CalendarCheck, Clock, Star, ShoppingBag } from 'lucide-react'
import logo from '../assets/logo.jpg'
import imgAlitas from '../assets/images/_MG_0062.jpg.jpeg'
import imgBurger from '../assets/images/_MG_0073.jpg.jpeg'
import imgTaco from '../assets/images/20220113_184337.jpg.jpeg'
import imgGauchito from '../assets/images/20230906_234552.jpg.jpeg'
import imgHamburguesas from '../assets/images/_MG_0073.jpg.jpeg'
import imgMakis from '../assets/images/_MG_0045.jpg.jpeg'
import imgCombos from '../assets/images/VID_60611013_080456_523(1).jpg.jpeg'

const RESERVA_WHATSAPP =
  'https://wa.me/51943358398?text=Hola,%20quiero%20reservar%20una%20mesa'

const highlights = [
  {
    label: 'Alitas BBQ',
    price: 'S/ 22',
    cat: 'ALITAS',
    img: imgAlitas
  },
  {
    label: 'La Fonda Burger',
    price: 'S/ 28',
    cat: 'BURGERS',
    img: imgBurger
  },
  {
    label: 'Taco de Pollo',
    price: 'S/ 20',
    cat: 'TACOS',
    img: imgTaco
  },
  {
  label: 'Gauchito',
  price: 'S/ 25',
  cat: 'MAKIS',
  img: imgGauchito
},
]

const features = [
  {
    title: 'Hamburguesas artesanales',
    desc: 'Pan suave, carne seleccionada y combinaciones de la casa.',
    img: imgHamburguesas
  },
  {
  title: 'Alitas con salsas de la casa',
  desc: 'BBQ, acevichada, salteadas, chimichurri y más sabores.',
  img: imgAlitas
},
  {
    title: 'Makis fusión',
    desc: 'Sabores Genzai preparados con ingredientes frescos.',
    img: imgMakis
  },
  {
  title: 'Combos para compartir',
  desc: 'Opciones familiares para disfrutar en grupo.',
  img: imgCombos
},
]

export default function Landing() {
  return (
    <div style={{ background: '#fff', color: '#111' }}>
      <section
        style={{
          background: 'linear-gradient(135deg,#111 0%,#1d1d1d 100%)',
          color: '#fff',
          padding: '5.5rem 2rem'
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1.1fr .9fr',
            gap: '3rem',
            alignItems: 'center'
          }}
        >
          <div>
            <span
              style={{
                display: 'inline-block',
                background: '#F5C800',
                color: '#111',
                fontSize: '0.75rem',
                fontWeight: 900,
                padding: '7px 14px',
                borderRadius: 999
              }}
            >
              FAST FOOD ARTESANAL
            </span>

            <h1
              style={{
                fontFamily: 'Bebas Neue',
                fontSize: 'clamp(3rem,7vw,5.4rem)',
                marginTop: '1rem',
                lineHeight: 0.95
              }}
            >
              Sabores intensos preparados al momento
            </h1>

            <p
              style={{
                color: '#cfcfcf',
                marginTop: '1.25rem',
                lineHeight: 1.8,
                fontSize: '1rem',
                maxWidth: 540
              }}
            >
              Hamburguesas, alitas, makis y platos fusión hechos con ingredientes frescos.
              Realiza tu pedido desde nuestra web o reserva una mesa por WhatsApp.
            </p>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
              <Link
                to="/carta"
                style={{
                  background: 'linear-gradient(135deg,#F5C800,#FFD93D)',
                  color: '#111',
                  padding: '14px 28px',
                  borderRadius: 12,
                  fontWeight: 900,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                Pedir online
                <ArrowRight size={18} />
              </Link>

              <a
                href={RESERVA_WHATSAPP}
                target="_blank"
                rel="noreferrer"
                style={{
                  border: '1px solid #F5C800',
                  color: '#F5C800',
                  padding: '14px 28px',
                  borderRadius: 12,
                  fontWeight: 900,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                <CalendarCheck size={18} />
                Reservar Mesa
              </a>
            </div>

            <div style={{ display: 'flex', gap: '2rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
              {[
                ['60+', 'PLATILLOS'],
                ['20 min', 'ENTREGA APROX.'],
                ['4.8', 'CALIFICACIÓN']
              ].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.8rem', color: '#F5C800' }}>
                    {v}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#888', fontWeight: 800 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              background: '#fff',
              borderRadius: 28,
              padding: '1rem',
              boxShadow: '0 30px 80px rgba(0,0,0,.35)'
            }}
          >
            <img
              src={imgBurger}
              alt="La Fonda Burger"
              style={{
                width: '100%',
                height: 410,
                objectFit: 'cover',
                borderRadius: 22
              }}
            />
          </div>
        </div>
      </section>

      <section style={{ padding: '4.5rem 2rem', maxWidth: 1120, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto 2.5rem' }}>
          <h2 style={{ fontFamily: 'Bebas Neue', fontSize: '2.6rem' }}>
            Lo que hacemos
          </h2>
          <p style={{ color: '#666', lineHeight: 1.7 }}>
            Especialidades preparadas con técnica, sabor y una presentación pensada para disfrutar.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {features.map(f => (
            <div
              key={f.title}
              style={{
                background: '#fff',
                border: '1px solid #E8E8E8',
                borderRadius: 18,
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.06)'
              }}
            >
              <img
                src={f.img}
                alt={f.title}
                style={{
                  width: '100%',
                  height: 160,
                  objectFit: 'cover'
                }}
              />

              <div style={{ padding: '1.25rem' }}>
                <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '1.35rem', marginBottom: '0.5rem' }}>
                  {f.title}
                </h3>
                <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.7 }}>
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#FAFAFA', padding: '4.5rem 2rem' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '2rem',
              gap: '1rem',
              flexWrap: 'wrap'
            }}
          >
            <div>
              <h2 style={{ fontFamily: 'Bebas Neue', fontSize: '2.5rem' }}>
                Destacados de la casa
              </h2>
              <p style={{ color: '#666' }}>
                Una selección de los favoritos para empezar tu pedido.
              </p>
            </div>

            <Link
              to="/carta"
              style={{
                background: '#111',
                color: '#fff',
                padding: '11px 20px',
                borderRadius: 10,
                textDecoration: 'none',
                fontSize: '0.86rem',
                fontWeight: 900
              }}
            >
              Ver carta completa
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {highlights.map(h => (
              <div
                key={h.label}
                style={{
                  background: '#fff',
                  border: '1px solid #E8E8E8',
                  borderRadius: 18,
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                }}
              >
                <img
                  src={h.img}
                  alt={h.label}
                  style={{
                    width: '100%',
                    height: 180,
                    objectFit: 'cover'
                  }}
                />

                <div style={{ padding: '1rem' }}>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      background: '#111',
                      color: '#F5C800',
                      padding: '3px 8px',
                      borderRadius: 6,
                      fontWeight: 900
                    }}
                  >
                    {h.cat}
                  </span>

                  <div style={{ fontWeight: 900, marginTop: '0.7rem' }}>{h.label}</div>
                  <div style={{ color: '#111', fontWeight: 900, marginTop: 4 }}>{h.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#F5C800', padding: '3.5rem 2rem' }}>
        <div
          style={{
            maxWidth: 1120,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div>
            <h2 style={{ fontFamily: 'Bebas Neue', fontSize: '2.2rem' }}>
              Realiza tu pedido desde la web
            </h2>
            <p style={{ color: '#333', fontWeight: 600 }}>
              Agrega productos al carrito, completa tus datos y consulta el estado de tu pedido con tu código.
            </p>
          </div>

          <Link
            to="/carta"
            style={{
              background: '#111',
              color: '#fff',
              padding: '13px 24px',
              borderRadius: 12,
              textDecoration: 'none',
              fontWeight: 900,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            Ver carta
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}
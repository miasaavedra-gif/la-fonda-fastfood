import { Link } from 'react-router-dom'
import { Award, ChefHat, Store, MapPin, ArrowRight, CalendarCheck } from 'lucide-react'

const RESERVA_WHATSAPP =
  'https://wa.me/51943358398?text=Hola,%20quiero%20reservar%20una%20mesa'

const valores = [
  {
    icon: Award,
    title: 'Calidad artesanal',
    desc: 'Cada preparación sigue estándares de sabor, presentación y consistencia.'
  },
  {
    icon: ChefHat,
    title: 'Ingredientes seleccionados',
    desc: 'Trabajamos con productos frescos y cuidadosamente elegidos para cada receta.'
  },
  {
    icon: Store,
    title: 'Experiencia local',
    desc: 'Somos un restaurante en Chaclacayo con atención cercana y personalizada.'
  }
]

export default function Nosotros() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <section
        style={{
          background: 'linear-gradient(135deg,#111 0%,#1b1b1b 100%)',
          padding: '4.5rem 2rem',
          color: '#fff'
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
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
                padding: '7px 14px',
                borderRadius: 999,
                fontSize: '0.75rem',
                fontWeight: 900
              }}
            >
              LA FONDA FAST FOOD
            </span>

            <h1
              style={{
                fontFamily: 'Bebas Neue',
                fontSize: 'clamp(3rem,6vw,5rem)',
                lineHeight: 0.95,
                marginTop: '1rem'
              }}
            >
              Sabor artesanal desde Chaclacayo
            </h1>

            <p
              style={{
                color: '#cfcfcf',
                lineHeight: 1.8,
                marginTop: '1.2rem',
                fontSize: '1rem'
              }}
            >
              En La Fonda preparamos hamburguesas, alitas, makis y platos fusión con ingredientes frescos,
              recetas cuidadas y atención cercana. Cada pedido se trabaja al momento para mantener calidad,
              sabor y presentación.
            </p>
          </div>

          <div
            style={{
              background: '#fff',
              borderRadius: 26,
              padding: '1rem',
              boxShadow: '0 25px 70px rgba(0,0,0,.35)'
            }}
          >
            <img
              src="/src/assets/images/20230809_214023.jpg.jpeg"
              alt="Especialidades La Fonda"
              style={{
                width: '100%',
                height: 360,
                objectFit: 'cover',
                borderRadius: 20
              }}
            />
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1120, margin: '0 auto', padding: '4rem 2rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}
        >
          {[
            ['60+', 'Platos en carta'],
            ['5 PM - 11 PM', 'Horario de atención'],
            ['Chaclacayo', 'Nuestro local']
          ].map(([num, label]) => (
            <div
              key={label}
              style={{
                background: '#FFFBEB',
                border: '1px solid #F5C800',
                borderRadius: 18,
                padding: '1.5rem',
                textAlign: 'center'
              }}
            >
              <div
                style={{
                  fontFamily: 'Bebas Neue',
                  fontSize: '2.2rem',
                  color: '#111'
                }}
              >
                {num}
              </div>
              <div style={{ color: '#666', fontWeight: 700, fontSize: '0.85rem' }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            textAlign: 'center',
            maxWidth: 680,
            margin: '0 auto 2.5rem'
          }}
        >
          <h2 style={{ fontFamily: 'Bebas Neue', fontSize: '2.5rem', marginBottom: '0.5rem' }}>
            Nuestra forma de trabajar
          </h2>

          <p style={{ color: '#666', lineHeight: 1.7 }}>
            Combinamos fast food artesanal, sabores fusión y una atención pensada para que cada visita o pedido sea una buena experiencia.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {valores.map(v => {
            const Icon = v.icon

            return (
              <div
                key={v.title}
                style={{
                  background: '#fff',
                  border: '1px solid #E8E8E8',
                  borderRadius: 18,
                  padding: '1.5rem',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                  transition: 'all .25s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.borderColor = '#F5C800'
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.09)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = '#E8E8E8'
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.06)'
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: '#FFFBEB',
                    border: '1px solid #F5C800',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}
                >
                  <Icon size={26} color="#111" />
                </div>

                <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '1.35rem', marginBottom: '0.5rem' }}>
                  {v.title}
                </h3>

                <p style={{ color: '#666', lineHeight: 1.7, fontSize: '0.9rem' }}>
                  {v.desc}
                </p>
              </div>
            )
          })}
        </div>

        <div
          style={{
            background: '#FAFAFA',
            borderRadius: 22,
            padding: '2rem',
            marginTop: '3rem',
            border: '1px solid #E8E8E8'
          }}
        >
          <h2 style={{ fontFamily: 'Bebas Neue', fontSize: '2rem', marginBottom: '1rem' }}>
            Nuestra historia
          </h2>

          <p style={{ color: '#555', lineHeight: 1.8 }}>
            La Fonda nació como un proyecto familiar con el objetivo de ofrecer fast food artesanal en Chaclacayo.
            Hoy seguimos creciendo con la misma filosofía: calidad, sabor y atención personalizada en cada pedido.
            Nuestra carta combina hamburguesas, alitas, makis y especialidades fusión pensadas para compartir.
          </p>

          <div
            style={{
              marginTop: '1.5rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#F5C800',
              padding: '9px 16px',
              borderRadius: 10,
              fontWeight: 900,
              fontSize: '0.85rem',
              color: '#111'
            }}
          >
            <MapPin size={17} />
            MZ F1 LT 12 Alfonso Cobian — Chaclacayo
          </div>
        </div>
      </section>

      <section
        style={{
          background: '#F5C800',
          padding: '3.2rem 2rem'
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}
        >
          <div>
            <h2 style={{ fontFamily: 'Bebas Neue', fontSize: '2.2rem' }}>
              ¿Listo para probar nuestros sabores?
            </h2>

            <p style={{ color: '#333', fontWeight: 600 }}>
              Explora la carta o reserva una mesa para visitarnos.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
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

            <a
              href={RESERVA_WHATSAPP}
              target="_blank"
              rel="noreferrer"
              style={{
                border: '2px solid #111',
                color: '#111',
                padding: '13px 24px',
                borderRadius: 12,
                textDecoration: 'none',
                fontWeight: 900,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              <CalendarCheck size={18} />
              Reservar Mesa
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
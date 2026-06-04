export default function Ubicacion() {
  
 
  const mapSrc = `https://maps.google.com/maps?q=La+Fonda+Fast+Food,+Chaclacayo,+Lima,+Peru&t=&z=17&ie=UTF8&iwloc=&output=embed`
 
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      {/* HERO */}
      <div style={{ background: '#111', padding: '3rem 2.5rem 2.5rem', borderBottom: '3px solid #F5C800' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'Bebas Neue', fontSize: '3.5rem', color: '#fff', lineHeight: 1, marginBottom: '0.5rem' }}>
            Dónde estamos
          </h1>
          <p style={{ color: '#888', fontSize: '1rem' }}>
            Ven a visitarnos o pide delivery. Atendemos todos los días de 5 PM a 11 PM.
          </p>
        </div>
      </div>
 
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '2.5rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '2rem', alignItems: 'start' }}>
 
          {/* COLUMNA IZQUIERDA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { label: 'Dirección', val: 'MZ F1 LT 12 Alfonso Cobian, Chaclacayo, Lima', icon: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z' },
              { label: 'Teléfono', val: '+51 943 358 398', icon: 'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z' },
              { label: 'Horario', val: '5:00 PM – 11:00 PM · Todos los días', icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z' },
              { label: 'Delivery', val: 'Chaclacayo · Costo de envío desde S/ 5.00', icon: 'M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z' },
            ].map(({ label, val, icon }) => (
              <div key={label} style={{
                background: '#FAFAFA', border: '1px solid #E8E8E8',
                borderRadius: 12, padding: '1.1rem 1.25rem',
                display: 'flex', gap: '1rem', alignItems: 'flex-start',
                transition: 'border-color 0.15s, box-shadow 0.15s'
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#F5C800'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(245,200,0,0.15)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#E8E8E8'; e.currentTarget.style.boxShadow = 'none' }}>
                <div style={{ flexShrink: 0, width: 36, height: 36, background: '#F5C800', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#111">
                    <path d={icon} />
                  </svg>
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.72rem', color: '#999', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3 }}>{label}</div>
                  <div style={{ fontWeight: 600, color: '#111', fontSize: '0.9rem', lineHeight: 1.4 }}>{val}</div>
                </div>
              </div>
            ))}
 
            <a href="https://wa.me/51943358398?text=Hola,%20quiero%20reservar%20una%20mesa" target="_blank" rel="noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                background: '#25D366', color: '#fff', padding: '14px',
                borderRadius: 10, fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem',
                transition: 'opacity 0.15s'
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Reservar Mesa
            </a>
 
            <a href={`https://www.google.com/maps/dir/?api=1&destination=La+Fonda+Fast+Food+Chaclacayo+Lima+Peru`} target="_blank" rel="noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                background: '#111', color: '#F5C800', padding: '14px',
                borderRadius: 10, fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem',
                border: '2px solid #F5C800', transition: 'background 0.15s'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#F5C800'; e.currentTarget.style.color = '#111' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#111'; e.currentTarget.style.color = '#F5C800' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              Cómo llegar
            </a>
          </div>
              
          {/* MAPA */}
          <div style={{ borderRadius: 14, overflow: 'hidden', border: '2px solid #F5C800', boxShadow: '0 4px 24px rgba(0,0,0,0.12)', height: 460 }}>
            <iframe
              title="La Fonda Fast Food - Chaclacayo"
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 'none', display: 'block' }}
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  )
}
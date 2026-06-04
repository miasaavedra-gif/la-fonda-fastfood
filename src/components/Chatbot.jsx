import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, ChevronRight } from 'lucide-react'
import { supabase } from '../supabase'
import logo from '../assets/logo.jpg'

const QUICK_REPLIES = [
  { label: 'Ver carta' },
  { label: 'Horario' },
  { label: 'Ubicación' },
  { label: 'Combos' },
  { label: 'WhatsApp' },
  { label: 'Consultar pedido' },
]

const normalizar = (texto) =>
  texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

function formatearEstado(estado) {
  const e = normalizar(estado || '')

  if (e === 'pendiente') return '🟡 Pedido recibido y pendiente de preparación.'
  if (e === 'preparando') return '👨‍🍳 Tu pedido se está preparando.'
  if (e === 'en camino' || e === 'en_camino') return '🛵 Tu pedido está en camino.'
  if (e === 'entregado') return '✅ Pedido entregado.'
  if (e === 'cancelado') return '❌ Pedido cancelado.'

  return estado || 'Estado no disponible'
}

function debeMostrarTiempo(estado) {
  const e = normalizar(estado || '')
  return e !== 'entregado' && e !== 'cancelado'
}

async function getResponse(msg) {
  const textoOriginal = msg.trim()
  const mensaje = normalizar(textoOriginal)

  const pedidoRegex = /^lf\d{4,}$/i

  if (pedidoRegex.test(textoOriginal)) {
    try {
      const { data: pedido, error } = await supabase
        .from('pedidos')
        .select('*')
        .eq('numero_pedido', textoOriginal.toUpperCase())
        .single()

      if (error || !pedido) {
        return { text: 'No encontré un pedido con ese número.' }
      }

      const mostrarTiempo = debeMostrarTiempo(pedido.estado)

      return {
        text:
          `📦 Pedido: ${pedido.numero_pedido}\n\n` +
          `${formatearEstado(pedido.estado)}\n\n` +
          `Cliente: ${pedido.cliente_nombre || 'No registrado'}\n` +
          `Total: S/ ${pedido.total}` +
          (mostrarTiempo
            ? `\nTiempo estimado: ${pedido.tiempo_estimado || 'No definido'} min`
            : '')
      }
    } catch (e) {
      console.error(e)
      return { text: 'Error consultando el pedido.' }
    }
  }

  if (
    mensaje.includes('pedido') ||
    mensaje.includes('seguimiento') ||
    mensaje.includes('donde esta mi pedido') ||
    mensaje.includes('consultar pedido')
  ) {
    return {
      text: 'Por favor escribe tu número de pedido.\n\nEjemplo: LF0014'
    }
  }

  if (mensaje.includes('whatsapp')) {
    return {
      text: 'Puedes escribirnos por WhatsApp aquí: 943 358 398, solo para hacer reserva de mesas, los pedidos se hacen solamente por nuestra web'
    }
  }

  if (mensaje.includes('horario')) {
    return {
      text: 'Atendemos de 5:00 PM a 11:00 PM.'
    }
  }

  if (mensaje.includes('ubicacion') || mensaje.includes('direccion')) {
    return {
      text: 'Estamos en Chaclacayo. Puedes ver la ubicación en la sección “Ubicación”.'
    }
  }

  const { data: chatbotData } = await supabase
    .from('chatbot')
    .select('*')

  if (chatbotData) {
    const encontrado = chatbotData.find(item => {
      const pregunta = normalizar(item.pregunta || '')

      return mensaje.includes(pregunta) || pregunta.includes(mensaje)
    })

    if (encontrado) {
      return { text: encontrado.respuesta }
    }
  }

  const { data: productos } = await supabase
    .from('productos')
    .select('*')

  if (productos) {
    const productoEncontrado = productos.find(p =>
      mensaje.includes(normalizar(p.nombre || ''))
    )

    if (productoEncontrado) {
      return {
        text: `${productoEncontrado.nombre}\n\nPrecio: S/ ${productoEncontrado.precio}`
      }
    }

    if (mensaje.includes('hamburguesa') || mensaje.includes('burger')) {
      const burgers = productos.filter(p =>
        normalizar(p.nombre || '').includes('burger')
      )

      return {
        text:
          'Hamburguesas disponibles:\n\n' +
          burgers.map(b => `• ${b.nombre}`).join('\n')
      }
    }

    if (mensaje.includes('alita')) {
      const alitas = productos.filter(p => p.categoria_id === 1)

      return {
        text:
          'Sabores de alitas:\n\n' +
          alitas.map(a => `• ${a.nombre}`).join('\n')
      }
    }

    if (
      mensaje.includes('carta') ||
      mensaje.includes('menu') ||
      mensaje.includes('productos')
    ) {
      return {
        text:
          'Productos disponibles:\n\n' +
          productos.map(p => `• ${p.nombre}`).join('\n')
      }
    }

    if (mensaje.includes('combo')) {
      const combos = productos.filter(p =>
        normalizar(p.nombre || '').includes('combo')
      )

      return {
        text:
          'Combos disponibles:\n\n' +
          combos.map(c => `• ${c.nombre} - S/ ${c.precio}`).join('\n')
      }
    }
  }

  return {
    text: 'No encontré información sobre eso. Pregúntame por horarios, ubicación, delivery, carta, precios, productos o estado de pedido.'
  }
}

function handleQuickAction(action) {
  const a = normalizar(action)

  if (a.includes('carta') || a.includes('menu')) return { nav: '/carta' }
  if (a.includes('ubicacion')) return { nav: '/ubicacion' }
  if (a.includes('whatsapp')) return { external: 'https://wa.me/51943358398' }

  return null
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: '¡Hola! Soy el asistente de La Fonda. Puedo ayudarte con la carta, precios, horarios, delivery o estado de pedido.',
      quick: ['Ver carta', 'Precios', 'Horario', 'Ubicación', 'Consultar pedido']
    }
  ])

  const [input, setInput] = useState('')
  const bottomRef = useRef(null)
const chatbotRef = useRef(null)

useEffect(() => {
  function handleClickOutside(event) {
    if (
      open &&
      chatbotRef.current &&
      !chatbotRef.current.contains(event.target)
    ) {
      setOpen(false)
    }
  }

  document.addEventListener('mousedown', handleClickOutside)

  return () => {
    document.removeEventListener('mousedown', handleClickOutside)
  }
}, [open])
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const send = async (text) => {
    const msg = text || input.trim()
    if (!msg) return

    const response = await getResponse(msg)

    setMessages(prev => [
      ...prev,
      { from: 'user', text: msg },
      { from: 'bot', ...response }
    ])

    setInput('')

    const action = handleQuickAction(msg)

    if (action?.external) {
      window.open(action.external, '_blank')
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 200,
          background: '#F5C800',
          border: 'none',
          borderRadius: '50%',
          width: 54,
          height: 54,
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(245,200,0,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.2s'
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        {open ? <X size={22} color="#111" /> : <MessageCircle size={22} color="#111" />}
      </button>

      {open && (
        <div
        ref={chatbotRef}
          style={{
            position: 'fixed',
            bottom: 90,
            right: 24,
            zIndex: 200,
            width: 340,
            background: '#fff',
            borderRadius: 16,
            boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
            border: '1px solid #E8E8E8',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            maxHeight: 520
          }}
        >
          <div style={{ background: '#111', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <img
  src={logo}
  alt="La Fonda"
  style={{
    width: 38,
    height: 38,
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #F5C800',
    flexShrink: 0
  }}
/>

            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>Asistente La Fonda</div>
              <div style={{ color: '#4ade80', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 6, height: 6, background: '#4ade80', borderRadius: '50%', display: 'inline-block' }} />
                En línea · 5PM – 11PM
              </div>
            </div>
          </div>

          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '14px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              background: '#FAFAFA'
            }}
          >
            {messages.map((m, i) => (
              <div key={i}>
                <div
                  style={{
                    alignSelf: m.from === 'user' ? 'flex-end' : 'flex-start',
                    display: 'inline-block',
                    maxWidth: '88%',
                    background: m.from === 'user' ? '#F5C800' : '#fff',
                    color: '#111',
                    borderRadius: m.from === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    padding: '9px 13px',
                    fontSize: '0.83rem',
                    lineHeight: 1.55,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
                    whiteSpace: 'pre-line',
                    float: m.from === 'user' ? 'right' : 'left',
                    clear: 'both'
                  }}
                >
                  {m.text}
                </div>

                {m.quick && m.from === 'bot' && (
                  <div style={{ clear: 'both', display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
                    {m.quick.map(q => (
                      <button
                        key={q}
                        onClick={() => send(q)}
                        style={{
                          background: '#fff',
                          border: '1.5px solid #F5C800',
                          borderRadius: 20,
                          padding: '4px 12px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          color: '#111',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4
                        }}
                      >
                        {q} <ChevronRight size={11} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div ref={bottomRef} />
          </div>

          <div style={{ padding: '8px 12px', borderTop: '1px solid #E8E8E8', display: 'flex', gap: '0.4rem', overflowX: 'auto', background: '#fff' }}>
            {QUICK_REPLIES.map(q => (
              <button
                key={q.label}
                onClick={() => send(q.label)}
                style={{
                  background: '#FAFAFA',
                  border: '1px solid #E8E8E8',
                  borderRadius: 6,
                  padding: '4px 10px',
                  fontSize: '0.73rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  color: '#555',
                  whiteSpace: 'nowrap'
                }}
              >
                {q.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', borderTop: '1px solid #E8E8E8', background: '#fff' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Escribe tu consulta..."
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                padding: '12px 14px',
                fontSize: '0.85rem',
                background: 'transparent'
              }}
            />

            <button
              onClick={() => send()}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#F5C800',
                padding: '0 14px'
              }}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
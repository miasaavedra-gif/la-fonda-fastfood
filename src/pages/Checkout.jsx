import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { CreditCard, Banknote, Smartphone, FileText, Building2, ChevronDown, ChevronUp } from 'lucide-react'
import yapeQR from '../assets/yape-qr.jpg'
import { ShieldCheck } from 'lucide-react'

const inputStyle = {
  width: '100%', padding: '10px 12px', border: '1.5px solid #E8E8E8',
  borderRadius: 8, fontSize: '0.92rem', outline: 'none',
  background: '#FAFAFA', color: '#111', transition: 'border-color 0.15s'
}

const focusStyle = { borderColor: '#F5C800', background: '#fff' }

function InputField({ label, value, onChange, placeholder, type = 'text', required }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', fontWeight: 600, fontSize: '0.82rem', color: '#555', marginBottom: 5, textTransform: 'uppercase', letterSpacing: 0.5 }}>
        {label} {required && <span style={{ color: '#E63B2E' }}>*</span>}
      </label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder}
        onFocus={e => { setFocused(true); Object.assign(e.target.style, focusStyle) }}
        onBlur={e => { setFocused(false); e.target.style.borderColor = '#E8E8E8'; e.target.style.background = '#FAFAFA' }}
        style={inputStyle} />
    </div>
  )
}

export default function Checkout() {
  const { cart, total, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [pedidoCreado, setPedidoCreado] = useState(null)
  const [form, setForm] = useState({ nombre: '', telefono: '', direccion: '', ciudad: 'Chaclacayo', observaciones: '' })
  const [pago, setPago] = useState('tarjeta')
  const [comprobante, setComprobante] = useState('boleta')
  const [tarjeta, setTarjeta] = useState({ numero: '', vencimiento: '', cvv: '', nombre: '' })
  const [ruc, setRuc] = useState({ numero: '', razon: '', direccion: '' })
  const [yapePhone, setYapePhone] = useState('')

  const f = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const formatCard = (v) => v.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19)
  const formatExp = (v) => v.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5)

  const handleSubmit = async () => {
    if (!form.nombre || !form.telefono || !form.direccion) return toast.error('Completa los datos de entrega')
    if (pago === 'tarjeta' && (!tarjeta.numero || !tarjeta.vencimiento || !tarjeta.cvv)) return toast.error('Completa los datos de tarjeta')
    if (pago === 'yape' && !yapePhone) return toast.error('Ingresa el número de Yape')

    setLoading(true)
    try {
      const tiempoEstimado = Math.floor(Math.random() * 16) + 20

const { data: pedido, error } = await supabase
  .from('pedidos')
  .insert({
    usuario_email: user?.email || form.nombre + '@guest.com',
    total: total + 5,
    estado: 'pendiente',
    direccion: `${form.direccion}, ${form.ciudad}`,
    telefono: form.telefono,
    cliente_nombre: form.nombre,
    metodo_pago: pago,
    comprobante: comprobante,
    observaciones: form.observaciones,
    tiempo_estimado: tiempoEstimado

  })
  .select()
  .single()
  
 

if (error) throw error

const numeroPedido = `LF${String(pedido.id).padStart(4, '0')}`

await supabase
  .from('pedidos')
  .update({
    numero_pedido: numeroPedido
  })
  .eq('id', pedido.id)
  setPedidoCreado({
  numero: numeroPedido,
  tiempo: tiempoEstimado

})

      const items = cart.map(item => ({
  pedido_id: pedido.id,
  producto_id: item.id,
  cantidad: item.qty,
  precio_unitario: item.precio
}))

const { error: itemsError } = await supabase
  .from('pedido_items')
  .insert(items)

if (itemsError) {
  console.error('Error guardando productos del pedido:', itemsError)
  throw itemsError
}
      clearCart()
      toast.success(
  `¡Pedido confirmado!\nNúmero de seguimiento: ${numeroPedido}`
)
      
    } catch (e) {
      console.error(e)
      toast.error('Error al procesar el pedido: ' + e.message)
    }
    setLoading(false)
  }

  const METODOS = [
    { id: 'tarjeta', label: 'Tarjeta', icon: <CreditCard size={20} /> },
    { id: 'yape', label: 'Yape', icon: <Smartphone size={20} /> },
    { id: 'efectivo', label: 'Efectivo', icon: <Banknote size={20} /> },
  ]

  const COMPROBANTES = [
    { id: 'boleta', label: 'Boleta', icon: <FileText size={18} /> },
    { id: 'factura', label: 'Factura', icon: <Building2 size={18} /> },
  ]

  const sectionTitle = (text) => (
    <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.2rem', color: '#111', marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '2px solid #F5C800', letterSpacing: 0.5 }}>{text}</div>
  )
  if (pedidoCreado) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#FAFAFA',
        padding: '2rem'
      }}
    >
      <div
        style={{
          background: '#fff',
          padding: '2rem',
          borderRadius: '16px',
          textAlign: 'center',
          maxWidth: '500px',
          width: '100%',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
        }}
      >
        <h1
          style={{
            color: '#16A34A',
            marginBottom: '1rem'
          }}
        >
          ✅ Pedido Confirmado
        </h1>

        <h2
          style={{
            fontSize: '2rem',
            marginBottom: '1rem'
          }}
        >
          {pedidoCreado.numero}
        </h2>

        <p
          style={{
            color: '#555',
            marginBottom: '1rem'
          }}
        >
          Guarda este número para consultar tu pedido.
        </p>

        <p
          style={{
            fontWeight: 'bold',
            marginBottom: '2rem'
          }}
        >
          Tiempo estimado: {pedidoCreado.tiempo} minutos
        </p>

        <button
          onClick={() => navigate('/')}
          style={{
            background: '#F5C800',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Volver al inicio
        </button>
      </div>
    </div>
  )
}
  return (
    <div style={{ background: '#FAFAFA', minHeight: '100vh', padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Bebas Neue', fontSize: '2.8rem', marginBottom: '0.25rem' }}>Finalizar pedido</h1>
        <p style={{ color: '#888', marginBottom: '2rem', fontSize: '0.9rem' }}>Completa tus datos para confirmar el pedido</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem', alignItems: 'start' }}>
          {/* LEFT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* DATOS DE ENTREGA */}
            <div style={{ background: '#fff', borderRadius: 14, padding: '1.75rem', border: '1px solid #E8E8E8' }}>
              {sectionTitle('Datos de entrega')}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
                <InputField label="Nombre completo" value={form.nombre} onChange={f('nombre')} placeholder="Juan Pérez" required />
                <InputField label="Teléfono" value={form.telefono} onChange={f('telefono')} placeholder="+51 999 000 000" required />
              </div>
              <InputField
  label="Dirección"
  value={form.direccion}
  onChange={f('direccion')}
  placeholder="Jr. Las Flores 456"
  required
/>

<div style={{ marginBottom: '1rem' }}>
  <label
    style={{
      display: 'block',
      fontWeight: 600,
      fontSize: '0.82rem',
      color: '#555',
      marginBottom: 5,
      textTransform: 'uppercase',
      letterSpacing: 0.5
    }}
  >
    Observaciones
  </label>

  <textarea
    value={form.observaciones}
    onChange={f('observaciones')}
    placeholder="Ejemplo: sin cebolla, tocar timbre, traer vuelto..."
    style={{
      width: '100%',
      minHeight: 90,
      padding: '12px',
      border: '1.5px solid #E8E8E8',
      borderRadius: 8,
      resize: 'vertical',
      background: '#FAFAFA'
    }}
  />
</div>

<InputField
  label="Ciudad / Distrito"
  value={form.ciudad}
  onChange={f('ciudad')}
  placeholder="Chaclacayo"
/>
            </div>

            {/* MÉTODO DE PAGO */}
            <div style={{ background: '#fff', borderRadius: 14, padding: '1.75rem', border: '1px solid #E8E8E8' }}>
              {sectionTitle('Método de pago')}
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {METODOS.map(m => (
                  <button key={m.id} onClick={() => setPago(m.id)} style={{
                    flex: 1, padding: '14px 8px', border: pago === m.id ? '2px solid #F5C800' : '2px solid #E8E8E8',
                    borderRadius: 10, background: pago === m.id ? '#FFFBEB' : '#FAFAFA',
                    cursor: 'pointer', transition: 'all 0.15s', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: 6, fontWeight: 700, fontSize: '0.85rem', color: '#111'
                  }}>
                    <span style={{ color: pago === m.id ? '#111' : '#888' }}>{m.icon}</span>
                    {m.label}
                  </button>
                ))}
              </div>

              {/* TARJETA */}
              {pago === 'tarjeta' && (
                <div style={{ background: '#FAFAFA', borderRadius: 10, padding: '1.25rem', border: '1px solid #E8E8E8' }}>
                  <div style={{ background: 'linear-gradient(135deg, #111 0%, #333 100%)', borderRadius: 12, padding: '1.25rem 1.5rem', marginBottom: '1.25rem', color: '#fff' }}>
                    <div style={{ fontSize: '0.72rem', color: '#aaa', marginBottom: '0.75rem', letterSpacing: 1 }}>NÚMERO DE TARJETA</div>
                    <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.4rem', letterSpacing: 3, color: tarjeta.numero ? '#F5C800' : '#555' }}>
                      {tarjeta.numero || '0000 0000 0000 0000'}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                      <div><div style={{ fontSize: '0.65rem', color: '#888' }}>TITULAR</div><div style={{ fontSize: '0.85rem' }}>{tarjeta.nombre || 'NOMBRE APELLIDO'}</div></div>
                      <div><div style={{ fontSize: '0.65rem', color: '#888' }}>VENCE</div><div style={{ fontSize: '0.85rem' }}>{tarjeta.vencimiento || 'MM/AA'}</div></div>
                    </div>
                  </div>
                  <InputField label="Nombre en la tarjeta" value={tarjeta.nombre} onChange={e => setTarjeta({ ...tarjeta, nombre: e.target.value })} placeholder="Juan Pérez" />
                  <InputField label="Número de tarjeta" value={tarjeta.numero} onChange={e => setTarjeta({ ...tarjeta, numero: formatCard(e.target.value) })} placeholder="0000 0000 0000 0000" />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <InputField label="Vencimiento" value={tarjeta.vencimiento} onChange={e => setTarjeta({ ...tarjeta, vencimiento: formatExp(e.target.value) })} placeholder="MM/AA" />
                    <InputField label="CVV" value={tarjeta.cvv} onChange={e => setTarjeta({ ...tarjeta, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })} placeholder="123" type="password" />
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                    🔒 Pago seguro · Datos cifrados con TLS 1.3
                  </div>
                </div>
              )}

              {/* YAPE */}
{pago === 'yape' && (
  <div
    style={{
      background: '#FAFAFA',
      borderRadius: 14,
      padding: '1.5rem',
      border: '1px solid #E8E8E8',
      textAlign: 'center'
    }}
  >
    <div
      style={{
        background: '#fff',
        borderRadius: 14,
        padding: '1rem',
        border: '1px solid #E8E8E8',
        marginBottom: '1rem',
        boxShadow: '0 8px 24px rgba(0,0,0,0.05)'
      }}
    >
      <img
        src={yapeQR}
        alt="QR Yape La Fonda"
        style={{
          width: 220,
          maxWidth: '100%',
          borderRadius: 12,
          display: 'block',
          margin: '0 auto'
        }}
      />
    </div>

    <h3
      style={{
        fontFamily: 'Bebas Neue',
        fontSize: '1.6rem',
        marginBottom: '0.5rem',
        color: '#111'
      }}
    >
      Pago por Yape
    </h3>

    <p
      style={{
        color: '#555',
        fontSize: '0.9rem',
        lineHeight: 1.7,
        marginBottom: '1rem'
      }}
    >
      Realiza el pago escaneando el QR o yapeando al número indicado.
    </p>

    <div
      style={{
        background: '#FFFBEB',
        border: '1px solid #F5C800',
        borderRadius: 12,
        padding: '1rem',
        marginBottom: '1rem'
      }}
    >
      <div style={{ fontSize: '0.75rem', color: '#777', fontWeight: 700 }}>
        Número de Yape
      </div>

      <div
        style={{
          fontSize: '1.35rem',
          fontWeight: 900,
          color: '#111',
          marginTop: 4
        }}
      >
        956 253 073
      </div>

      <div style={{ fontSize: '0.82rem', color: '#777', marginTop: 4 }}>
        Sonnen Sac
      </div>
    </div>

    <InputField
      label="Número de la persona que realizó el Yape"
      value={yapePhone}
      onChange={e => setYapePhone(e.target.value)}
      placeholder="+51 999 000 000"
      required
    />
  </div>
)}

              {/* EFECTIVO */}
              {pago === 'efectivo' && (
                <div style={{ background: '#FAFAFA', borderRadius: 10, padding: '1.5rem', border: '1px solid #E8E8E8' }}>
                  <div style={{ background: 'linear-gradient(135deg, #1a5c1a 0%, #2d8a2d 100%)', borderRadius: 12, padding: '1.5rem', marginBottom: '1.25rem', color: '#fff', textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💵</div>
                    <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.5rem', letterSpacing: 1 }}>Pago en efectivo</div>
                    <div style={{ fontSize: '0.85rem', color: '#aed6ae', marginTop: '0.25rem' }}>Al momento de la entrega</div>
                  </div>
                  <p style={{ color: '#555', fontSize: '0.85rem', lineHeight: 1.7 }}>
                    El repartidor cobrará el monto exacto al entregar. Por favor ten el monto listo: <strong style={{ color: '#111' }}>S/ {(total + 5).toFixed(2)}</strong>
                  </p>
                  <div style={{ background: '#FFFBEB', border: '1px solid #F5C800', borderRadius: 8, padding: '0.75rem', marginTop: '1rem', fontSize: '0.82rem', color: '#555' }}>
                    💡 Si necesitas vuelto, indícalo en las notas del pedido.
                  </div>
                </div>
              )}
            </div>

            {/* COMPROBANTE */}
            <div style={{ background: '#fff', borderRadius: 14, padding: '1.75rem', border: '1px solid #E8E8E8' }}>
              {sectionTitle('Comprobante de pago')}
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
                {COMPROBANTES.map(c => (
                  <button key={c.id} onClick={() => setComprobante(c.id)} style={{
                    flex: 1, padding: '12px', border: comprobante === c.id ? '2px solid #F5C800' : '2px solid #E8E8E8',
                    borderRadius: 10, background: comprobante === c.id ? '#FFFBEB' : '#FAFAFA',
                    cursor: 'pointer', fontWeight: 700, fontSize: '0.88rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: '#111'
                  }}>
                    <span style={{ color: comprobante === c.id ? '#111' : '#888' }}>{c.icon}</span>
                    {c.label}
                  </button>
                ))}
              </div>

              {comprobante === 'boleta' && (
                <div style={{ background: '#FAFAFA', borderRadius: 8, padding: '1rem', border: '1px solid #E8E8E8' }}>
                  <p style={{ color: '#666', fontSize: '0.85rem' }}>La boleta se emitirá a nombre del titular del pedido. La recibirás al momento de la entrega.</p>
                  <InputField label="Nombre para la boleta" value={form.nombre} onChange={f('nombre')} placeholder="Juan Pérez" />
                  <InputField label="DNI (opcional)" value={form.dni || ''} onChange={e => setForm({ ...form, dni: e.target.value })} placeholder="12345678" />
                </div>
              )}

              {comprobante === 'factura' && (
                <div style={{ background: '#FAFAFA', borderRadius: 8, padding: '1rem', border: '1px solid #E8E8E8' }}>
                  <InputField label="RUC" value={ruc.numero} onChange={e => setRuc({ ...ruc, numero: e.target.value.replace(/\D/g, '').slice(0, 11) })} placeholder="20123456789" required />
                  <InputField label="Razón social" value={ruc.razon} onChange={e => setRuc({ ...ruc, razon: e.target.value })} placeholder="Mi Empresa S.A.C." required />
                  <InputField label="Dirección fiscal" value={ruc.direccion} onChange={e => setRuc({ ...ruc, direccion: e.target.value })} placeholder="Av. Lima 123, Lima" />
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN — RESUMEN */}
          <div style={{ background: '#fff', borderRadius: 14, padding: '1.75rem', border: '1px solid #E8E8E8', position: 'sticky', top: 80 }}>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.4rem', marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '2px solid #F5C800' }}>Tu pedido</div>

            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', fontSize: '0.88rem' }}>
                <span style={{ color: '#333' }}>{item.nombre} <span style={{ color: '#999' }}>x{item.qty}</span></span>
                <span style={{ fontWeight: 600 }}>S/ {(item.precio * item.qty).toFixed(2)}</span>
              </div>
            ))}

            <div style={{ borderTop: '1px solid #E8E8E8', marginTop: '1rem', paddingTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.88rem', color: '#666' }}>
                <span>Subtotal</span><span>S/ {total.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.88rem', color: '#666' }}>
                <span>Envío</span><span>S/ 5.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.15rem', color: '#111' }}>
                <span>Total</span>
                <span style={{ color: '#E63B2E' }}>S/ {(total + 5).toFixed(2)}</span>
              </div>
            </div>

            <button onClick={handleSubmit} disabled={loading} style={{
              width: '100%', marginTop: '1.5rem',
              background: loading ? '#ccc' : '#F5C800',
              border: 'none', borderRadius: 10, padding: '15px',
              fontWeight: 800, fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer',
              color: '#111', letterSpacing: 0.3, transition: 'background 0.15s'
            }}>
              {loading ? 'Procesando...' : `Confirmar pedido · S/ ${(total + 5).toFixed(2)}`}
            </button>

            <p style={{ textAlign: 'center', fontSize: '0.73rem', color: '#aaa', marginTop: '0.75rem' }}>
              🔒 Pago seguro · Datos cifrados
            </p>

            <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#FAFAFA', borderRadius: 8, fontSize: '0.78rem', color: '#888', lineHeight: 1.6 }}>
              Método: <strong style={{ color: '#111', textTransform: 'capitalize' }}>{pago}</strong> · Comprobante: <strong style={{ color: '#111', textTransform: 'capitalize' }}>{comprobante}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
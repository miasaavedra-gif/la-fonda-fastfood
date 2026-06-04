import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import logo from '../assets/logo.jpg'

const ADMIN_USER = 'admin'
const ADMIN_PASS = 'lafonda2025'

const estados = ['todos', 'pendiente', 'preparando', 'en camino', 'entregado', 'cancelado']

const cardStyle = {
  background: '#fff',
  borderRadius: 14,
  padding: '1.5rem',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
}

const sectionStyle = {
  background: '#fff',
  borderRadius: 14,
  padding: '1.5rem',
  marginBottom: '2rem',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  overflowX: 'auto'
}

const thStyle = {
  textAlign: 'left',
  padding: '12px',
  background: '#111',
  color: '#fff',
  whiteSpace: 'nowrap'
}

const tdStyle = {
  padding: '12px',
  borderBottom: '1px solid #eee',
  verticalAlign: 'top'
}

export default function Admin() {
  const [auth, setAuth] = useState(() => sessionStorage.getItem('admin_auth') === 'true')
  const [loginForm, setLoginForm] = useState({ user: '', pass: '' })
  const [loginError, setLoginError] = useState('')
  const [pedidos, setPedidos] = useState([])
  const [clientes, setClientes] = useState([])
  const [filtroEstado, setFiltroEstado] = useState('todos')
  const [pedidoAbierto, setPedidoAbierto] = useState(null)

  const handleLogin = () => {
    if (loginForm.user === ADMIN_USER && loginForm.pass === ADMIN_PASS) {
      sessionStorage.setItem('admin_auth', 'true')
      setAuth(true)
      setLoginError('')
    } else {
      setLoginError('Usuario o contraseña incorrectos')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth')
    setAuth(false)
  }

  const cargarDatos = async () => {
    const { data: pedidosData, error } = await supabase
      .from('pedidos')
      .select(`
        *,
        pedido_items(
          id,
          cantidad,
          precio_unitario,
          productos(nombre)
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error(error)
      return
    }

    setPedidos(pedidosData || [])

    if (pedidosData) {
      const map = {}

      pedidosData.forEach(p => {
        const cliente = p.usuario_email || p.cliente_nombre || 'Cliente invitado'

        if (!map[cliente]) {
          map[cliente] = {
            email: cliente,
            pedidos: 0,
            total: 0
          }
        }

        map[cliente].pedidos++
        map[cliente].total += Number(p.total || 0)
      })

      setClientes(Object.values(map))
    }
  }

  useEffect(() => {
    if (!auth) return
    cargarDatos()
  }, [auth])

  const actualizarEstado = async (id, nuevoEstado) => {
    const { error } = await supabase
      .from('pedidos')
      .update({ estado: nuevoEstado })
      .eq('id', id)

    if (error) {
      alert('Error al actualizar estado')
      console.error(error)
      return
    }

    setPedidos(prev =>
      prev.map(p =>
        p.id === id ? { ...p, estado: nuevoEstado } : p
      )
    )
  }

  if (!auth) {
    return (
      <div style={{ minHeight: '100vh', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: '2.5rem', width: 360, boxShadow: '0 8px 40px rgba(0,0,0,0.3)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: '2rem', color: '#F5C800' }}>La Fonda</div>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: '1.3rem', color: '#111' }}>Panel Administrativo</div>
          </div>

          {[['user', 'Usuario', 'text', 'admin'], ['pass', 'Contraseña', 'password', '••••••']].map(([key, label, type, ph]) => (
            <div key={key} style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.8rem', color: '#555', marginBottom: 5 }}>
                {label}
              </label>

              <input
                type={type}
                value={loginForm[key]}
                placeholder={ph}
                onChange={e => setLoginForm({ ...loginForm, [key]: e.target.value })}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #E8E8E8', borderRadius: 8 }}
              />
            </div>
          ))}

          {loginError && <p style={{ color: '#E63B2E', fontSize: '0.82rem' }}>{loginError}</p>}

          <button
            onClick={handleLogin}
            style={{ width: '100%', background: '#F5C800', border: 'none', borderRadius: 10, padding: 14, fontWeight: 800, cursor: 'pointer' }}
          >
            Ingresar
          </button>
        </div>
      </div>
    )
  }

  const hoy = new Date()
  const inicioHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate())
  const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1)

  const pedidosFiltrados = filtroEstado === 'todos'
    ? pedidos
    : pedidos.filter(p => p.estado === filtroEstado)

  const ventasHoy = pedidos
    .filter(p => new Date(p.created_at) >= inicioHoy)
    .reduce((acc, p) => acc + Number(p.total || 0), 0)

  const ventasMes = pedidos
    .filter(p => new Date(p.created_at) >= inicioMes)
    .reduce((acc, p) => acc + Number(p.total || 0), 0)

  const totalVentas = pedidos.reduce((acc, p) => acc + Number(p.total || 0), 0)

  const ticketPromedio =
    pedidos.length > 0
      ? totalVentas / pedidos.length
      : 0

  const clienteTop = [...clientes].sort((a, b) => b.total - a.total)[0]

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '2rem' }}>
      <div
  style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem'
  }}
>
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    }}
  >
    <img
      src={logo}
      alt="La Fonda"
      style={{
        width: 80,
        height: 80,
        objectFit: 'cover',
        borderRadius: '50%',
        boxShadow: '0 4px 15px rgba(0,0,0,0.15)'
      }}
    />

    <div>
      <h1 style={{ margin: 0 }}>
        Panel Administrativo
      </h1>

      <p
        style={{
          margin: 0,
          color: '#666'
        }}
      >
        La Fonda Fast Food
      </p>
    </div>
  </div>

  <button
    onClick={handleLogout}
    style={{
      background: '#111',
      color: '#fff',
      border: 'none',
      padding: '10px 16px',
      borderRadius: 8,
      cursor: 'pointer'
    }}
  >
    Cerrar sesión
  </button>
</div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <div style={cardStyle}>
          <h3>Ventas hoy</h3>
          <strong>S/ {ventasHoy.toFixed(2)}</strong>
        </div>

        <div style={cardStyle}>
          <h3>Ventas del mes</h3>
          <strong>S/ {ventasMes.toFixed(2)}</strong>
        </div>

        <div style={cardStyle}>
          <h3>Total histórico</h3>
          <strong>S/ {totalVentas.toFixed(2)}</strong>
        </div>

        <div style={cardStyle}>
          <h3>Pedidos</h3>
          <strong>{pedidos.length}</strong>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <div style={cardStyle}>
          <h3>Pendientes</h3>
          <strong>{pedidos.filter(p => p.estado === 'pendiente').length}</strong>
        </div>

        <div style={cardStyle}>
          <h3>Preparando</h3>
          <strong>{pedidos.filter(p => p.estado === 'preparando').length}</strong>
        </div>

        <div style={cardStyle}>
          <h3>En camino</h3>
          <strong>{pedidos.filter(p => p.estado === 'en camino').length}</strong>
        </div>

        <div style={cardStyle}>
          <h3>Entregados</h3>
          <strong>{pedidos.filter(p => p.estado === 'entregado').length}</strong>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
        <div style={cardStyle}>
          <h3>Cliente que más compra</h3>
          <strong>{clienteTop ? clienteTop.email : 'Sin datos'}</strong>
          <p>{clienteTop ? `S/ ${clienteTop.total.toFixed(2)}` : ''}</p>
        </div>

        <div style={cardStyle}>
          <h3>Ticket promedio</h3>
          <strong>S/ {ticketPromedio.toFixed(2)}</strong>
          <p>Promedio por pedido</p>
        </div>
      </div>

      <div style={sectionStyle}>
        <h2>Filtros de pedidos</h2>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {estados.map(e => (
            <button
              key={e}
              onClick={() => setFiltroEstado(e)}
              style={{
                background: filtroEstado === e ? '#F5C800' : '#fff',
                border: '1px solid #ddd',
                borderRadius: 8,
                padding: '8px 14px',
                cursor: 'pointer',
                fontWeight: 700,
                textTransform: 'capitalize'
              }}
            >
              {e}
            </button>
          ))}
        </div>
      </div>

      <div style={sectionStyle}>
        <h2>Pedidos</h2>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>N° seguimiento</th>
              <th style={thStyle}>Cliente</th>
              <th style={thStyle}>Teléfono</th>
              <th style={thStyle}>Total</th>
              <th style={thStyle}>Pago</th>
              <th style={thStyle}>Estado</th>
              <th style={thStyle}>Tiempo</th>
              <th style={thStyle}>Detalle</th>
            </tr>
          </thead>

          <tbody>
            {pedidosFiltrados.map(p => (
              <>
                <tr key={p.id}>
                  <td style={tdStyle}>
                    <strong>{p.numero_pedido || `LF${String(p.id).padStart(4, '0')}`}</strong>
                  </td>

                  <td style={tdStyle}>{p.cliente_nombre || p.usuario_email || 'Sin cliente'}</td>
                  <td style={tdStyle}>{p.telefono || '-'}</td>
                  <td style={tdStyle}>S/ {Number(p.total || 0).toFixed(2)}</td>
                  <td style={tdStyle}>{p.metodo_pago || '-'}</td>

                  <td style={tdStyle}>
                    <select
                      value={p.estado || 'pendiente'}
                      onChange={(e) => actualizarEstado(p.id, e.target.value)}
                      style={{ padding: '8px', borderRadius: 8, border: '1px solid #ddd', fontWeight: 700 }}
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="preparando">Preparando</option>
                      <option value="en camino">En camino</option>
                      <option value="entregado">Entregado</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                  </td>

                  <td style={tdStyle}>
                    {p.estado === 'entregado' || p.estado === 'cancelado'
                      ? '-'
                      : `${p.tiempo_estimado || 25} min`}
                  </td>

                  <td style={tdStyle}>
                    <button
                      onClick={() => setPedidoAbierto(pedidoAbierto === p.id ? null : p.id)}
                      style={{ background: '#111', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 12px', cursor: 'pointer' }}
                    >
                      {pedidoAbierto === p.id ? 'Ocultar' : 'Ver detalle'}
                    </button>
                  </td>
                </tr>

                {pedidoAbierto === p.id && (
                  <tr>
                    <td colSpan="8" style={{ padding: '1rem', background: '#FAFAFA' }}>
                      <h3>Detalle del pedido</h3>

                      <p><strong>Dirección:</strong> {p.direccion || '-'}</p>
                      <p>
  <strong>Fecha:</strong>{' '}
  {p.created_at
    ? new Date(
        new Date(p.created_at).getTime() - (5 * 60 * 60 * 1000)
      ).toLocaleString('es-PE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    : '-'}
</p>
                      <p><strong>Observaciones:</strong> {p.observaciones || 'Sin observaciones'}</p>
                      <p><strong>Comprobante:</strong> {p.comprobante || '-'}</p>

                      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                        <thead>
                          <tr>
                            <th style={thStyle}>Producto</th>
                            <th style={thStyle}>Cantidad</th>
                            <th style={thStyle}>Precio unitario</th>
                            <th style={thStyle}>Subtotal</th>
                          </tr>
                        </thead>

                        <tbody>
                          {p.pedido_items?.length > 0 ? (
                            p.pedido_items.map(item => (
                              <tr key={item.id}>
                                <td style={tdStyle}>{item.productos?.nombre || 'Producto sin nombre'}</td>
                                <td style={tdStyle}>{item.cantidad}</td>
                                <td style={tdStyle}>S/ {Number(item.precio_unitario || 0).toFixed(2)}</td>
                                <td style={tdStyle}>
                                  S/ {(Number(item.precio_unitario || 0) * Number(item.cantidad || 0)).toFixed(2)}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td style={tdStyle} colSpan="4">No hay productos registrados para este pedido.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
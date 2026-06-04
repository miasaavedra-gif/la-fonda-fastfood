import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import { useCart } from '../context/CartContext'
import { Search, ShoppingCart, Plus, Minus, Trash2, ImageOff } from 'lucide-react'
import toast from 'react-hot-toast'
import logo from '../assets/logo.jpg'

const normalizar = (txt = '') =>
  txt
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()

const imgLocal = (file) => `/src/assets/images/${file}`

const IMAGENES = {
  // ALITAS
  'bbq': imgLocal('_MG_0062.jpg.jpeg'),
  'bufalo': 'https://images.unsplash.com/photo-1608039755401-742074f0548d?auto=format&fit=crop&w=900&q=80',
  'chimichurri': imgLocal('_MG_0084.jpg.jpeg'),
  'acevichada': imgLocal('_MG_0053.jpg.jpeg'),
  'maracuya': 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=900&q=80',
  'teriyaki': 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=900&q=80',
  'mango': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
  'anticuchera': imgLocal('_MG_0084.jpg.jpeg'),
  'la nativa': 'https://images.unsplash.com/photo-1608039755401-742074f0548d?auto=format&fit=crop&w=900&q=80',
  'salteadas': imgLocal('20230705_192427.jpg.jpeg'),
  'crispy': imgLocal('20230705_194757.jpg.jpeg'),
  'la charapita': 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=900&q=80',
  'la base': 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=900&q=80',

  // TACOS
  'taco de carne': imgLocal('20220113_184341.jpg.jpeg'),
  'taco de pollo': 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=900&q=80',

  // BROASTER
  '1/4 pierna broaster': imgLocal('IMG_20210714_185550.jpg.jpeg'),
  'pecho broaster': 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=900&q=80',
  'pollo a la plancha': 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=80',

  // FUSIONES
  'broaster a lo pobre - pierna': imgLocal('VID_60611013_080456_523(1).jpg.jpeg'),
  'broaster a lo pobre - pecho': imgLocal('VID_60611013_080456_523(1).jpg.jpeg'),
  'broaster burguer - pierna': 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=900&q=80',
  'broaster burguer - pecho': 'https://images.unsplash.com/photo-1615297928064-24977384d0da?auto=format&fit=crop&w=900&q=80',

  // COMBOS
  '100 alitas': imgLocal('20250522_204424.jpg.jpeg'),
  '70 alitas': imgLocal('20250522_204424.jpg.jpeg'),
  '40 alitas': imgLocal('_MG_4478.JPG.jpeg'),
  '20 alitas': imgLocal('_MG_4478.JPG.jpeg'),
  '20 alitas cheese': imgLocal('_MG_4478.JPG.jpeg'),
  'barco mixto o alas': imgLocal('20250522_204424.jpg.jpeg'),

  // BURGERS
  'la clasica': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
  'la royal': imgLocal('20250917_210401.jpg.jpeg'),
  'hawaiana': 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80',
  'a lo pobre': 'https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=900&q=80',
  'bacon': 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=900&q=80',
  'parrillera': imgLocal('_MG_4419.JPG.jpeg'),
  'la crunch': imgLocal('_MG_0073.jpg.jpeg'),
  'la fonda burger': imgLocal('_MG_4431.jpg.jpeg'),
  'fondera crunch': imgLocal('_MG_4457.JPG.jpeg'),

  // SALCHIS
  'clasica salchi': imgLocal('20220123_171354.jpg.jpeg'),
  'salchipolo': imgLocal('20220123_171357.jpg.jpeg'),
  'achorada': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=80',
  'a lo pobre salchi': 'https://images.unsplash.com/photo-1630431341973-02e1b662ec35?auto=format&fit=crop&w=900&q=80',
  'hamburguesona': imgLocal('VID_60611013_080456_523(1).jpg.jpeg'),
  'la asesina': imgLocal('_MG_0094.jpg.jpeg'),

  // EXTRAS
  'porc de papa familiar': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=80',
  'porc de papa personal': 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=900&q=80',
  'pollo saltado': 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80',
  'lomo saltado': 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=900&q=80',

  // MAKIS
  'acevichado': imgLocal('_MG_0053.jpg.jpeg'),
  'furai': imgLocal('20230906_234552.jpg.jpeg'),
  'parrillero': imgLocal('20230906_234207.jpg.jpeg'),
  'avocado': imgLocal('_MG_9999.jpg.jpeg'),
  'ori': imgLocal('20230906_234207.jpg.jpeg'),
  'pizza maki': imgLocal('20230906_234236.jpg.jpeg'),
  'baby': imgLocal('_MG_9929.jpg.jpeg'),
  'parmesano': imgLocal('20230906_234434.jpg.jpeg'),
  'crunch maki': imgLocal('20230906_234552.jpg.jpeg'),
  'volcan': imgLocal('_MG_0045.jpg.jpeg'),
  'ryu': imgLocal('_MG_9968.jpg.jpeg'),
  'tempura': imgLocal('20230907_000649(0).jpg.jpeg'),
  'gauchito': imgLocal('gaucho 3.jpg.jpeg'),
  'tsurai': imgLocal('20230907_000655.jpg.jpeg'),

  // CALIENTES
  'yakimeshi mixto': imgLocal('20230906_215459.jpg.jpeg'),
  'chickenkatzu': 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80',
  'ebi furai': imgLocal('20230906_215721.jpg.jpeg'),
  'gyozas': 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=900&q=80',

  // POKEBOWL
  'pokebowl acevichado': imgLocal('20250917_203338.jpg.jpeg'),
  'tropical poke': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80',

  // SUSHI
  'gunkan tnt': imgLocal('20230906_215421.jpg.jpeg'),
  'nigiri': imgLocal('20230906_215459.jpg.jpeg'),
  'temaki': imgLocal('20230906_215721.jpg.jpeg'),

  // PROMOCIONES
  '2 tablas': imgLocal('_MG_9999.jpg.jpeg'),
  '3 tablas': imgLocal('_MG_9999.jpg.jpeg'),
  '4 tablas': imgLocal('20230906_234207.jpg.jpeg'),
  '5 tablas': imgLocal('20220808_152551.jpg.jpeg'),
  '2 tablas + caliente': imgLocal('20230906_234207.jpg.jpeg'),
  '4 tablas + nigiri': imgLocal('20220808_152551.jpg.jpeg'),

  // BARCOS GENZAI
  'barco genzai 100 pzs': imgLocal('20220808_152551.jpg.jpeg'),
  'barco genzai 140 pzs': imgLocal('20220808_152551.jpg.jpeg')
}

function getImg(producto) {
  const nombre = normalizar(producto.nombre)

  if (IMAGENES[nombre]) {
    return IMAGENES[nombre]
  }

  if (producto.imagen_url) {
    return producto.imagen_url
  }

  return logo
}

function SkeletonCard() {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #E8E8E8',
        borderRadius: 18,
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
      }}
    >
      <div style={{ height: 190, background: '#f1f1f1' }} />
      <div style={{ padding: '1rem' }}>
        <div style={{ height: 16, background: '#f1f1f1', borderRadius: 8, marginBottom: 10 }} />
        <div style={{ height: 40, background: '#f6f6f6', borderRadius: 8, marginBottom: 16 }} />
        <div style={{ height: 38, background: '#f1f1f1', borderRadius: 10 }} />
      </div>
    </div>
  )
}

export default function Carta() {
  const [productos, setProductos] = useState([])
  const [filtro, setFiltro] = useState('Todos')
  const [busqueda, setBusqueda] = useState('')
  const [loading, setLoading] = useState(true)

  const { cart, addItem, removeItem, updateQty } = useCart()

  useEffect(() => {
    const cargarProductos = async () => {
      const { data, error } = await supabase
        .from('productos')
        .select('*, categorias(nombre)')
        .eq('disponible', true)
        .order('id', { ascending: true })

      if (error) {
        console.error(error)
        toast.error('No se pudo cargar la carta')
      }

      setProductos(data || [])
      setLoading(false)
    }

    cargarProductos()
  }, [])

  const categorias = [
    'Todos',
    ...new Set(productos.map(p => p.categorias?.nombre).filter(Boolean))
  ]

  const productosFiltrados = productos.filter(p => {
    const coincideCategoria =
      filtro === 'Todos' || p.categorias?.nombre === filtro

    const coincideBusqueda =
      p.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.descripcion?.toLowerCase().includes(busqueda.toLowerCase())

    return coincideCategoria && coincideBusqueda
  })

  const getCartItem = (id) => cart.find(item => item.id === id)

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <section
        style={{
          background: 'linear-gradient(135deg,#111,#1b1b1b)',
          padding: '3.5rem 2rem',
          borderBottom: '3px solid #F5C800'
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <img
            src={logo}
            alt="La Fonda"
            style={{
              width: 64,
              height: 64,
              objectFit: 'cover',
              borderRadius: '50%',
              border: '3px solid #F5C800'
            }}
          />

          <div>
            <h1
              style={{
                fontFamily: 'Bebas Neue',
                fontSize: '3rem',
                color: '#fff',
                lineHeight: 1
              }}
            >
              Nuestra Carta
            </h1>

            <p style={{ color: '#bbb', marginTop: 6 }}>
              Elige tus favoritos y arma tu pedido directamente desde la web.
            </p>
          </div>
        </div>
      </section>

      <section
        style={{
          background: '#fff',
          borderBottom: '1px solid #E8E8E8',
          position: 'sticky',
          top: 70,
          zIndex: 20,
          padding: '1rem 2rem',
          boxShadow: '0 8px 24px rgba(0,0,0,0.04)'
        }}
      >
        <div style={{ maxWidth: 1120, margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              flexWrap: 'wrap',
              marginBottom: '1rem'
            }}
          >
            <div
              style={{
                position: 'relative',
                flex: '1 1 280px',
                maxWidth: 420
              }}
            >
              <Search
                size={17}
                style={{
                  position: 'absolute',
                  left: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#777'
                }}
              />

              <input
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                placeholder="Buscar producto..."
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 42px',
                  background: '#FAFAFA',
                  border: '1px solid #E8E8E8',
                  borderRadius: 12,
                  outline: 'none',
                  fontSize: '0.92rem'
                }}
              />
            </div>

            <div
              style={{
                background: '#FFFBEB',
                border: '1px solid #F5C800',
                borderRadius: 12,
                padding: '10px 14px',
                fontWeight: 800,
                fontSize: '0.85rem',
                color: '#111'
              }}
            >
              Pedidos solo por la web
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '0.55rem',
              overflowX: 'auto',
              paddingBottom: 4
            }}
          >
            {categorias.map(cat => (
              <button
                key={cat}
                onClick={() => setFiltro(cat)}
                style={{
                  padding: '8px 18px',
                  borderRadius: 999,
                  border: filtro === cat ? '1px solid #F5C800' : '1px solid #E8E8E8',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  background: filtro === cat ? '#F5C800' : '#fff',
                  color: '#111',
                  transition: 'all .2s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <main style={{ maxWidth: 1120, margin: '0 auto', padding: '2.5rem 2rem' }}>
        {loading ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(255px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : productosFiltrados.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#777' }}>
            <ImageOff size={42} />
            <h3 style={{ marginTop: '1rem' }}>No encontramos productos</h3>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(255px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {productosFiltrados.map(p => {
              const imgSrc = getImg(p)
              const itemCart = getCartItem(p.id)

              return (
                <div
                  key={p.id}
                  style={{
                    background: '#fff',
                    borderRadius: 18,
                    overflow: 'hidden',
                    border: '1px solid #E8E8E8',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                    transition: 'all .25s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.09)'
                    e.currentTarget.style.borderColor = '#F5C800'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)'
                    e.currentTarget.style.borderColor = '#E8E8E8'
                  }}
                >
                  <div
                    style={{
                      height: 190,
                      overflow: 'hidden',
                      position: 'relative',
                      background: '#FAFAFA'
                    }}
                  >
                    <img
                      src={imgSrc}
                      alt={p.nombre}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      onError={e => {
                        e.currentTarget.src = logo
                      }}
                    />

                    <span
                      style={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        background: '#F5C800',
                        color: '#111',
                        fontSize: '0.68rem',
                        fontWeight: 900,
                        padding: '5px 10px',
                        borderRadius: 999
                      }}
                    >
                      {p.categorias?.nombre || 'Producto'}
                    </span>
                  </div>

                  <div style={{ padding: '1.1rem' }}>
                    <h3
                      style={{
                        color: '#111',
                        fontWeight: 900,
                        fontSize: '1rem',
                        marginBottom: '0.4rem',
                        textTransform: 'uppercase'
                      }}
                    >
                      {p.nombre}
                    </h3>

                    <p
                      style={{
                        color: '#666',
                        fontSize: '0.82rem',
                        lineHeight: 1.55,
                        marginBottom: '1rem',
                        minHeight: 50
                      }}
                    >
                      {p.descripcion || 'Producto disponible en La Fonda.'}
                    </p>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '0.75rem'
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'Bebas Neue',
                          fontSize: '1.55rem',
                          color: '#111'
                        }}
                      >
                        S/ {Number(p.precio).toFixed(2)}
                      </span>

                      {!itemCart ? (
                        <button
                          onClick={() => {
                            addItem({
                              id: p.id,
                              nombre: p.nombre,
                              precio: Number(p.precio),
                              imagen: imgSrc
                            })
                            toast.success(`${p.nombre} agregado`)
                          }}
                          style={{
                            background: 'linear-gradient(135deg,#F5C800,#FFD93D)',
                            border: 'none',
                            borderRadius: 12,
                            padding: '10px 14px',
                            cursor: 'pointer',
                            fontWeight: 900,
                            fontSize: '0.82rem',
                            color: '#111',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6
                          }}
                        >
                          <ShoppingCart size={15} />
                          Agregar
                        </button>
                      ) : (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            background: '#FAFAFA',
                            border: '1px solid #E8E8E8',
                            borderRadius: 12,
                            padding: 5
                          }}
                        >
                          <button
                            onClick={() => updateQty(p.id, itemCart.qty - 1)}
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: 8,
                              border: '1px solid #E8E8E8',
                              background: '#fff',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Minus size={14} />
                          </button>

                          <span style={{ width: 24, textAlign: 'center', fontWeight: 900 }}>
                            {itemCart.qty}
                          </span>

                          <button
                            onClick={() => updateQty(p.id, itemCart.qty + 1)}
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: 8,
                              border: '1px solid #F5C800',
                              background: '#F5C800',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Plus size={14} />
                          </button>

                          <button
                            onClick={() => removeItem(p.id)}
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: 8,
                              border: '1px solid #E8E8E8',
                              background: '#fff',
                              cursor: 'pointer',
                              color: '#999',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
import { useState } from 'react'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Login() {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ nombre: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    setLoading(true)
    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, form.email, form.password)
      } else {
        const cred = await createUserWithEmailAndPassword(auth, form.email, form.password)
        await updateProfile(cred.user, { displayName: form.nombre })
      }
      toast.success(mode === 'login' ? '¡Bienvenido de vuelta!' : '¡Cuenta creada!')
      navigate('/')
    } catch (e) {
      toast.error(e.message.includes('wrong-password') ? 'Contraseña incorrecta' : e.message.includes('user-not-found') ? 'Usuario no encontrado' : 'Error al autenticar')
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ background: '#fff', borderRadius: 16, padding: '2.5rem', width: '100%', maxWidth: 400, border: '1px solid #eee', boxShadow: '0 4px 30px rgba(0,0,0,0.07)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: '2.5rem', color: '#F5C800' }}>La Fonda</div>
          <h2 style={{ fontFamily: 'Bebas Neue', fontSize: '1.5rem', marginTop: '0.5rem' }}>
            {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </h2>
        </div>

        {mode === 'register' && (
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 4 }}>Nombre</label>
            <input value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })}
              style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 8, outline: 'none' }} />
          </div>
        )}

        {[['email', 'Email', 'email'], ['password', 'Contraseña', 'password']].map(([key, label, type]) => (
          <div key={key} style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 4 }}>{label}</label>
            <input type={type} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 8, outline: 'none' }} />
          </div>
        ))}

        <button onClick={handleSubmit} disabled={loading} style={{
          width: '100%', background: '#F5C800', border: 'none', borderRadius: 10, padding: 14,
          fontWeight: 700, fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '0.5rem'
        }}>
          {loading ? 'Cargando...' : mode === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
        </button>

        <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.9rem', color: '#666' }}>
          {mode === 'login' ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
          <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            style={{ background: 'none', border: 'none', color: '#F5C800', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>
            {mode === 'login' ? 'Regístrate' : 'Inicia sesión'}
          </button>
        </p>

        <Link to="/" style={{ display: 'block', textAlign: 'center', marginTop: '0.75rem', color: '#999', fontSize: '0.85rem', textDecoration: 'none' }}>← Volver al inicio</Link>
      </div>
    </div>
  )
}
import { supabase } from '../supabase'

export async function buscarPedido(numeroPedido) {
  const { data, error } = await supabase
    .from('pedidos')
    .select('*')
    .eq('numero_pedido', numeroPedido)
    .single()

  if (error) throw error

  return data
}
import { createClient } from '@/lib/supabase/server'

export type Championship = {
  id: string
  name: string
  year: number
}

export async function getChampionship(): Promise<Championship | null> {
  const supabase = await createClient()
  const slug = process.env.NEXT_PUBLIC_CHAMPIONSHIP_SLUG ?? 'fia-motorsport-games-2026'
  const { data } = await supabase
    .from('championships')
    .select('id, name, year')
    .eq('slug', slug)
    .single()
  return data
}

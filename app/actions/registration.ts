'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export type RegistrationFields = {
  firstName: string
  lastName: string
  country: string
  phone: string
  steamId: string
  consentProfiling: boolean
  consentMarketing: boolean
  acceptedRegulation: boolean
}

export async function updateRegistration(
  registrationId: string,
  fields: RegistrationFields
) {
  if (!fields.acceptedRegulation) {
    return { error: 'You must accept the competition regulations.' }
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { error } = await supabase
    .from('registrations')
    .update({
      first_name: fields.firstName,
      last_name: fields.lastName,
      country: fields.country,
      phone: fields.phone,
      steam_id: fields.steamId,
      consent_profiling: fields.consentProfiling,
      consent_marketing: fields.consentMarketing,
      accepted_regulation: fields.acceptedRegulation,
    })
    .eq('id', registrationId)
    .eq('user_id', user.id) // RLS double-check

  if (error) {
    return { error: error.message }
  }

  redirect('/registrations?updated=1')
}

'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export type RegistrationFields = {
  firstName: string
  lastName: string
  dateOfBirth: string
  nationality: string
  phone: string
  steamId: string
  isOfLegalAge: boolean
  namedCompetitorFirstName: string
  namedCompetitorLastName: string
  namedCompetitorNationality: string
  namedCompetitorEmail: string
  namedCompetitorPhone: string
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
      date_of_birth: fields.dateOfBirth,
      nationality: fields.nationality,
      phone: fields.phone,
      steam_id: fields.steamId,
      is_of_legal_age: fields.isOfLegalAge,
      named_competitor_first_name: fields.isOfLegalAge ? null : fields.namedCompetitorFirstName,
      named_competitor_last_name: fields.isOfLegalAge ? null : fields.namedCompetitorLastName,
      named_competitor_nationality: fields.isOfLegalAge ? null : fields.namedCompetitorNationality,
      named_competitor_email: fields.isOfLegalAge ? null : fields.namedCompetitorEmail,
      named_competitor_phone: fields.isOfLegalAge ? null : fields.namedCompetitorPhone,
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

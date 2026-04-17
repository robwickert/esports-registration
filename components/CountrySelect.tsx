import { COUNTRIES } from '@/lib/countries'

type Props = {
  value: string
  onChange: (value: string) => void
  required?: boolean
  placeholder?: string
  className?: string
}

export default function CountrySelect({
  value,
  onChange,
  required,
  placeholder = 'Select nationality',
  className,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className={className}
    >
      <option value="">{placeholder}</option>
      {COUNTRIES.map(({ code, name }) => (
        <option key={code} value={code}>
          {name} ({code})
        </option>
      ))}
    </select>
  )
}

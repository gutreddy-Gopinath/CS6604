import React from 'react'

const Select = ({ value, onChange, options }) => {
  const handleChange = event => {
    // console.log({ val: event.target.value })
    onChange({ label: event.target.value, value: event.target.value })
  }
  return (
    <select onChange={handleChange}>
      <option value="">--select--</option>
      {options.map(opt => <option value={opt.value}>{opt.label}</option>)}
    </select>
  )
}

export default Select;
import { CustomSelect } from './styles';

export default function Select({label, options}) {
  return (
    <CustomSelect>
      <label htmlFor={String(label).toLowerCase()}>{label}</label>
      <select id={String(label).toLowerCase()}>
        {options.map((option, index) => {
          return (
            <option key={index} value={option.value}>{option.name}</option>
          )
        })}
      </select>
    </CustomSelect>
  )
}
import { CustomSelect } from './styles';

export default function Select({
  label, 
  options, 
  value, 
  setter,
  keyValue,
}) {
  return (
    <CustomSelect>
      <label 
        htmlFor={String(label).toLowerCase()}
      >
        {label}
      </label>
      <select 
        id={String(label).toLowerCase()}
        value={value} 
        onChange={(e) => setter((old) => ({...old, [keyvalue]: e.target.value}))}
      >
        {options.map((option, index) => {
          return (
            <option key={index} value={option.value}>
              {option.name}
            </option>
          )
        })}
      </select>
    </CustomSelect>
  )
}
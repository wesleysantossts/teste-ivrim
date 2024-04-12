import { Container } from './styles'

export default function Input({type, label, setter, value, keyValue}) {
  return (
    <Container>
      <label htmlFor='input'>{label}</label>
      <input 
        id='input' 
        type={type} 
        value={value} 
        onChange={e => setter((old) => ({...old, [keyValue]: e.target.value}))}
      />
    </Container>
  )
}
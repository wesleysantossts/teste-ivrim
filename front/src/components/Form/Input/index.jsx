import { Container } from './styles'

export default function Input({type, label, setter, keyValue}) {
  return (
    <Container>
      <label htmlFor='input'>{label}</label>
      <input id='input' type={type} onChange={e => setter((old) => ({...old, [keyValue]: e.target.value}))}/>
    </Container>
  )
}
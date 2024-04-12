import { Container } from './styles'

export default function Input({ type, label, formState, value, keyValue }) {
  return (
    <Container>
      <label htmlFor='input'>{label}</label>
      <input
        id='input'
        type={type}
        value={value}
        onChange={e => formState.setModalData({ ...formState.modalData, [keyValue]: e.target.value })}
      />
    </Container>
  )
}
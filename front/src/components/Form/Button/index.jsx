import { Container } from "./styles";

export default function Button({text}) {
  return (
    <Container>
      <button type='submit'>
        <p>{text}</p>
      </button>
    </Container>
  )
}
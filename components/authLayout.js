
import { Container, SSRProvider } from 'react-bootstrap'

export default function authLayout({ children }) {
  return (
    <SSRProvider>
      <Container fluid>
        <main>{children}</main>
      </Container>
    </SSRProvider>
  )
}
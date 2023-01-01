
import { Container, SSRProvider } from 'react-bootstrap'

export default function authLayout({ children }) {
  return (
    <SSRProvider>
      <Container className='container'>
        ttt
        <main>{children}</main>
        
      </Container>
    </SSRProvider>
  )
}
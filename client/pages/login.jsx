import { Container, Row, Col } from 'reactstrap'
import { Pokeball } from '../components/svg'
import { Authenticate } from '../containers'

export default function Login() {
  return (
    <Container>
      <Row id="root" className="align-items-center">
        <Col>
          <div id="login-form">
            <h1 className="text-center mb-4">Log In</h1>
            <Pokeball id="logo" />
            <Authenticate />
          </div>
        </Col>
      </Row>
      <style jsx global>{`
        #root {
          min-height: 100vh;
        }
        #login-form {
          max-width: 350px;
          margin: 0 auto 4rem;
        }
        #logo {
          display: block;
          width: calc(100% / 3);
          margin: 0 auto 1rem;
        }
      `}</style>
    </Container>
  )
}

Login.getInitialProps = ({ res, router, isServer, session }) => {
  if (!session.user) return
  isServer
    ? res.redirect('/')
    : router.replace('/')
}

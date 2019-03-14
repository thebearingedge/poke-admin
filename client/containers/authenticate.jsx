import { FORM_ERROR } from 'final-form'
import { Component } from 'react'
import { LoginForm } from '../components/login'
import { withServices } from '../services/context'

class Authenticate extends Component {
  handleLogin = async credentials => {
    const { api, router, session } = this.props.services
    const { status, data } = await api.post('/auth/login', credentials, {
      validateStatus: status => [201, 400, 401].includes(status)
    })
    switch (status) {
      case 201:
        session.start(data)
        router.push('/')
        return
      default:
        return { [FORM_ERROR]: 'Invalid login.' }
    }
  }
  render() {
    return (
      <LoginForm onSubmit={this.handleLogin}/>
    )
  }
}

export default withServices(Authenticate, ({ api, router, session }) => ({
  api,
  router,
  session
}))

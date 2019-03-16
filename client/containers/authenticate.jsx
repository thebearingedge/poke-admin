import { FORM_ERROR } from 'final-form'
import { Component } from 'react'
import { LoginForm } from '../components/login'
import { Alert } from '../components/modal'
import { withServices } from '../services/context'

class Authenticate extends Component {
  handleLogin = async credentials => {
    const { api, modal, router, session } = this.props
    const { status, data } = await api.post('/auth/login', credentials, {
      validateStatus: status => [201, 400, 401].includes(status)
    })
    switch (status) {
      case 201:
        session.start(data)
        router.push('/')
        return
      case 400:
        return data.errors.body
      case 401:
        modal.open({
          render({ close }) {
            return (
              <Alert
                close={close}
                message={data.message} />
            )
          }
        })
        return { [FORM_ERROR]: data.message }
    }
  }
  render() {
    return (
      <LoginForm onSubmit={this.handleLogin} />
    )
  }
}

export default withServices(Authenticate, ({ api, router, modal, session }) => ({
  api,
  modal,
  router,
  session
}))

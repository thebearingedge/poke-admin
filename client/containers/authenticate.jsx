import { FORM_ERROR } from 'final-form'
import { LoginForm } from '../components/login'
import { Alert } from '../components/modal'
import { withServices } from '../services/context'

const Authenticate = ({ api, modal, router, session }) => {
  const handleLogin = async credentials => {
    const { status, data } = await api.post('/auth/login', credentials, {
      validateStatus: status => [201, 400, 401].includes(status)
    })
    switch (status) {
      case 201:
        session.start(data)
        router.replace('/')
        return
      case 400:
        return data.errors.body
      case 401:
        modal.open({
          render({ close }) {
            return <Alert close={close} message={data.message} />
          }
        })
        return { [FORM_ERROR]: data.message }
    }
  }
  return (
    <LoginForm onSubmit={handleLogin} />
  )
}

export default withServices(Authenticate, ({ api, router, modal, session }) => ({
  api,
  modal,
  router,
  session
}))

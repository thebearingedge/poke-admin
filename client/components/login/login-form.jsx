import { Button } from 'reactstrap'
import { Form, Field, Actions } from '../form'
import logInSchema from '~/schemas/log-in'

export default function LoginForm(props) {
  return (
    <Form
      {...props}
      className="login-form d-block"
      schema={logInSchema}
      render={({ submitting, submitSucceeded }) => {
        return (
          <>
            <Field
              autoFocus
              id="login-form-email"
              label="Username"
              name="username"
              placeholder="ketchum97"
              type="text" />
            <Field
              id="login-form-password"
              label="Password"
              name="password"
              placeholder="***********"
              type="password" />
            <Actions>
              <Button
                color="primary"
                disabled={submitting || submitSucceeded}
                type="submit">
                Submit
              </Button>
            </Actions>
          </>
        )
      }} />
  )
}

import { Button } from 'reactstrap'
import { Form, Field, Actions } from '../form'

export default function LoginForm(props) {
  return (
    <Form {...props} className="login-form d-block" render={({ submitting }) => {
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
            placeholder="*****"
            type="password" />
          <Actions>
            <Button
              color="primary"
              disabled={submitting}
              type="submit">
              Submit
            </Button>
          </Actions>
        </>
      )
    }} />
  )
}

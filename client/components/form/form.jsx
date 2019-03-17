import { setIn } from 'final-form'
import { Form as FinalForm } from 'react-final-form'

export default function Form({
  initialValues,
  onSubmit,
  render,
  schema,
  ...formProps
}) {
  const validate = async values => {
    if (!schema) return
    try {
      await schema.validate(values, { abortEarly: false })
    }
    catch (invalid) {
      const errors = invalid.inner.reduce((errors, error) => (
        setIn(errors, error.path, error.message)
      ), {})
      return errors
    }
  }
  return (
    <FinalForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, ...renderProps }) => (
        <form
          className="mb-4"
          noValidate
          onSubmit={handleSubmit}
          {...formProps}>
          { render(renderProps) }
        </form>
      )} />
  )
}

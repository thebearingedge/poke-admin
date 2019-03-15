import { setIn } from 'final-form'
import { Component } from 'react'
import { Form as FinalForm } from 'react-final-form'

export default class Form extends Component {
  static defaultProps = {
    schema: null
  }
  validate = async values => {
    const { schema } = this.props
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
  render() {
    const { validate } = this
    const { onSubmit, initialValues, render, schema, ...formProps } = this.props
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
}

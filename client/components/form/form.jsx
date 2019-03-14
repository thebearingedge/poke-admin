import { Component } from 'react'
import { Form as FinalForm } from 'react-final-form'

export default class Form extends Component {
  render() {
    const { onSubmit, initialValues, render, ...formProps } = this.props
    return (
      <FinalForm
        initialValues={initialValues}
        onSubmit={onSubmit}
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

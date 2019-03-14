import { Field as FinalField } from 'react-final-form'
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap'

function nullEmpty(value) {
  return String(value).trim()
    ? value
    : null
}

export default function Field({
  id, label, name, parse, ...inputProps
}) {
  return (
    <FinalField name={name} parse={parse} render={({ input, meta }) => {
      const { error, submitError, submitting, dirtySinceLastSubmit } = meta
      const errorMessage = dirtySinceLastSubmit ? error : submitError
      return (
        <FormGroup>
          { label &&
            <Label for={id}>{ label }</Label>
          }
          <Input
            disabled={submitting}
            id={id}
            invalid={!!errorMessage} {...input} {...inputProps}/>
          { errorMessage &&
            <FormFeedback tooltip>{ errorMessage }</FormFeedback>
          }
        </FormGroup>
      )
    }} />
  )
}

Field.defaultProps = {
  parse: nullEmpty
}

import identity from 'lodash/identity'
import { Field as FinalField } from 'react-final-form'
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap'

export default function Field({
  id, label, name, parse, ...inputProps
}) {
  return (
    <FinalField name={name} parse={parse} render={({ input, meta }) => {
      const { error, submitError, submitting, submitSucceeded, touched } = meta
      const errorMessage = touched ? error : submitError
      return (
        <FormGroup className="position-relative">
          { label &&
            <Label for={id}>{ label }</Label>
          }
          <Input
            disabled={submitting || submitSucceeded}
            id={id}
            invalid={!!errorMessage} {...input} {...inputProps}/>
          { errorMessage &&
            <FormFeedback tooltip style={{ right: 0 }}>{ errorMessage }</FormFeedback>
          }
        </FormGroup>
      )
    }} />
  )
}

Field.defaultProps = {
  parse: identity
}

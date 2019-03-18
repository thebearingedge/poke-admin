import { FormGroup } from 'reactstrap'

export default function Actions(props) {
  return (
    <FormGroup {...props}/>
  )
}

Actions.defaultProps = {
  className: 'text-right'
}

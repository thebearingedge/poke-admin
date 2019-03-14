import { Component, createRef } from 'react'
import { ModalHeader, ModalBody, Button } from 'reactstrap'

export default class Alert extends Component {
  constructor(props) {
    super(props)
    this.dismissButtonRef = createRef()
  }
  handleDismissClick = () => {
    this.props.close()
  }
  componentDidMount() {
    setTimeout(() => this.dismissButtonRef.current.focus())
  }
  render() {
    const { message } = this.props
    const { handleDismissClick, dismissButtonRef } = this
    return (
      <>
        <ModalHeader className="py-4 justify-content-center">
          { message }
        </ModalHeader>
        <ModalBody className="d-flex justify-content-center">
          <Button
            color="secondary"
            innerRef={dismissButtonRef}
            name="dismiss-modal"
            onClick={handleDismissClick}>Dismiss</Button>
        </ModalBody>
      </>
    )
  }
}

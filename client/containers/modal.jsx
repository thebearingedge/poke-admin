import noop from 'lodash/noop'
import { Component } from 'react'
import { Modal as ReactstrapModal } from 'reactstrap'
import { withServices } from '../services'

class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      response: null
    }
    this.unsubscribe = noop
  }
  onClosed = () => {
    this.props.modal.close(this.state.response)
    this.setState({ response: null })
  }
  close = response => {
    this.setState({ isOpen: false, response })
  }
  componentDidMount() {
    this.unsubscribe = this.props.modal.subscribe(({ isOpen }) => {
      this.setState({ isOpen })
    })
  }
  componentWillUnmount() {
    this.unsubscribe()
  }
  render() {
    const { modal } = this.props
    const { isOpen } = this.state
    const { close, onClosed, onOpened } = this
    return (
      <ReactstrapModal
        centered
        isOpen={isOpen}
        onClosed={onClosed}
        onOpened={onOpened}>
        { modal.render({ close }) }
      </ReactstrapModal>
    )
  }
}

export default withServices(Modal, ({ modal }) => ({
  modal
}))

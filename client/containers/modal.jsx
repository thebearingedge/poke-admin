import { useState, useEffect } from 'react'
import { Modal as ReactstrapModal } from 'reactstrap'
import { withServices } from '../services'

export function Modal({ modal }) {
  const [ state, setState ] = useState({
    isOpen: false,
    response: null
  })
  const close = response => {
    setState({ ...state, isOpen: false, response })
  }
  const onClosed = () => {
    modal.done(state.response)
    setState({ ...state, response: null })
  }
  useEffect(() => modal.subscribe(({ isOpen }) => {
    setState({ ...state, isOpen })
  }), [])
  return (
    <ReactstrapModal
      centered
      isOpen={state.isOpen}
      onClosed={onClosed}>
      { modal.render({ close }) }
    </ReactstrapModal>
  )
}

export default withServices(Modal, ({ modal }) => ({
  modal
}))

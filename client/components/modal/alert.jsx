import { useEffect, useRef } from 'react'
import { ModalHeader, ModalBody, Button } from 'reactstrap'

export default function Alert({ close, message }) {
  const dismissButtonRef = useRef()
  const handleDismissClick = () => close()
  useEffect(() => {
    dismissButtonRef.current.focus()
  }, [])
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

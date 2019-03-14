import noop from 'lodash/noop'
import { Model, isServer } from '../lib'

class Modal extends Model {
  get init() {
    return {
      onClose: noop,
      isOpen: false,
      render: noop
    }
  }
  get render() {
    return this._model.render
  }
  open({ onClose = noop, render = noop }) {
    if (this._model.isOpen) return
    this.update({
      isOpen: true,
      onClose,
      render
    })
  }
  close(response) {
    if (!this._model.isOpen) return
    this._model.onClose(response)
    this.update(this.init)
  }
}

let modal

export default function initModal() {
  if (isServer) return new Modal()
  modal = modal || new Modal()
  return modal
}

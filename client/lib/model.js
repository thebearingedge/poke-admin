export default class Model {
  constructor() {
    this._listeners = []
    this._model = this.init
  }
  get init() {
    return {}
  }
  subscribe(listener) {
    const listenerIndex = this._listeners.push(listener) - 1
    listener(this._model)
    return () => {
      this._listeners.splice(listenerIndex, 1)
    }
  }
  update(updater) {
    switch (typeof updater) {
      case 'function':
        this._model = { ...this._model, ...updater(this._model) }
        break
      case 'object':
        this._model = { ...this._model, ...updater }
        break
      default:
        throw new Error('updater passed to StateModel.setState must be a Function or an Object.')
    }
    this._listeners.forEach(listener => listener(this._model))
  }
}

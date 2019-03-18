export default class Model {
  constructor() {
    this._listeners = []
    this._model = this.init
  }
  get init() {
    return {}
  }
  subscribe(fn) {
    const index = this._listeners.push(fn) - 1
    fn(this._model)
    return () => {
      this._listeners.splice(index, 1)
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
        throw new Error('updater passed to Model.update must be a Function or an Object.')
    }
    this._listeners.forEach(fn => fn(this._model))
  }
}

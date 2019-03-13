import { Consumer } from '../lib'

export default function Index() {
  return (
    <Consumer>
      { value => {
        // eslint-disable-next-line no-console
        console.log(Object.keys(value))
        return <h1>Hello, World!</h1>
      }}
    </Consumer>
  )
}

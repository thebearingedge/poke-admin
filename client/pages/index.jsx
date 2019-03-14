import { authorize } from '../lib'
import { Consumer } from '../services'

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

Index.getInitialProps = authorize()

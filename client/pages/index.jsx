import { authorize } from '../lib'

export default function Index() {
  return (
    <h1>Hello, World!</h1>
  )
}

Index.getInitialProps = authorize()

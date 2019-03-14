import identity from 'lodash/identity'
import { createContext, PureComponent } from 'react'
import getDisplayName from 'react-display-name'

export const { Provider, Consumer } = createContext({})

export const withServices = (Component, selectServices = identity) => {
  return class WithServices extends PureComponent {
    static displayName = `WithServices(${getDisplayName(Component)})`
    render() {
      return (
        <Consumer>
          { services =>
            <Component {...selectServices(services)} {...this.props} />
          }
        </Consumer>
      )
    }
  }
}

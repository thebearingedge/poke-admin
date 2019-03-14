import { createContext, PureComponent } from 'react'
import getDisplayName from 'react-display-name'

export const { Provider, Consumer } = createContext({})

export const withServices = (Component, pickServices) => {
  return class WithServices extends PureComponent {
    static displayName = `WithServices(${getDisplayName(Component)})`
    services = null
    render() {
      return (
        <Consumer>
          { services => {
            this.services = this.services || pickServices(services)
            return (
              <Component services={this.services} {...this.props} />
            )
          }}
        </Consumer>
      )
    }
  }
}

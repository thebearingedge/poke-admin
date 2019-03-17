import identity from 'lodash/identity'
import { createContext, memo, useContext } from 'react'
import getDisplayName from 'react-display-name'

const servicesContext = createContext({})

export const { Provider } = servicesContext

export const withServices = (Component, selectServices = identity) => {
  const WithServices = memo(props => {
    const services = useContext(servicesContext)
    return (
      <Component {...selectServices(services)} {...props} />
    )
  })
  WithServices.displayName = `WithServices(${getDisplayName(Component)})`
  return WithServices
}

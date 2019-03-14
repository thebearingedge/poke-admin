import noop from 'lodash/noop'
import Router from 'next/router'
import NProgress from 'nprogress'
import App, { Container } from 'next/app'
import { isServer } from '../lib'
import { Provider, initApi, initSession } from '../services'

export default class extends App {
  static async getInitialProps({ Component, router, ctx }) {
    const sessionID = isServer ? ctx.req.sessionID : null
    const api = initApi(sessionID)
    const user = isServer ? ctx.req.session.user : null
    const session = initSession(user)
    const { getInitialProps = noop } = Component
    return {
      user,
      pageProps: await getInitialProps({
        ...ctx, api, router, session, isServer
      })
    }
  }
  constructor(props, ...args) {
    super(props, ...args)
    this.api = initApi()
    this.session = initSession(props.user)
  }
  componentDidMount() {
    NProgress.configure({ showSpinner: false })
    Router.router.events.on('routeChangeStart', () => NProgress.start())
    Router.router.events.on('routeChangeError', () => NProgress.done())
    Router.router.events.on('routeChangeComplete', () => NProgress.done())
  }
  render() {
    const { router } = Router
    const { api, session } = this
    const { Component, pageProps = {} } = this.props
    return (
      <>
        <Container>
          <Provider value={{ api, router, session }}>
            <Component {...pageProps}/>
          </Provider>
        </Container>
        <style jsx global>{`
          html {
            font-size: 18px;
          }
          ::placeholder {
            opacity: 0.75 !important;
          }
        `}</style>
      </>
    )
  }
}

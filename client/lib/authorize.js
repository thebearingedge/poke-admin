import noop from 'lodash/noop'

export default function authorize(getInitialProps = noop) {
  return ({ res, router, session, isServer, ...ctx }) => {
    if (!session.user) {
      return isServer
        ? res.redirect('/login')
        : router.replace('/login')
    }
    return getInitialProps({ res, router, session, isServer, ...ctx })
  }
}

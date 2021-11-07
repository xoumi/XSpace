import type { AppProps } from 'next/app'
import Nav from 'components/Nav'
import React from 'react'

import 'sass/index.sass'

// suppress useLayoutEffect warnings
if (!process.browser) React.useLayoutEffect = React.useEffect

function MyApp ({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <div className='light-theme'>
      <Nav />
    <Component {...pageProps} />
    </div>
  )
}

export default MyApp

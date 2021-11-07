import type { AppProps } from 'next/app'
import TransitionLayout from 'components/layout/TransitionLayout'
import TransitionContext from 'context/TransitionContext'
import Nav from 'components/Nav'
import React from 'react'

import 'sass/index.sass'

// suppress useLayoutEffect warnings
if (!process.browser) React.useLayoutEffect = React.useEffect

function MyApp ({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <div className='light-theme'>
      <Nav />
      <TransitionContext>
        <TransitionLayout>
          <Component {...pageProps} />
        </TransitionLayout>
      </TransitionContext>
    </div>
  )
}

export default MyApp

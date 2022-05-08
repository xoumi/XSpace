import type { AppProps } from 'next/app';
import type { LayoutPage } from 'types/additional';
import type { ReactNode } from 'react';
import React from 'react';
import TransitionLayout from 'components/layout/TransitionLayout';
import TransitionProvider from 'context/TransitionContext';
import Nav from 'components/Nav';
import 'simplebar-react/dist/simplebar.min.css';
import '../sass/index.sass';

type Props = AppProps & {
  Component: LayoutPage
}
// suppress useLayoutEffect warnings
if (!process.browser) React.useLayoutEffect = React.useEffect;

function MyApp({ Component, pageProps }: Props): JSX.Element {
  const getLayout = Component.getLayout == null
    ? (page: ReactNode) => page
    : Component.getLayout;

  return (
    <div className='light-theme root'>
      <Nav />
      <TransitionProvider>
        <TransitionLayout>
          {getLayout(<Component {...pageProps} />)}
        </TransitionLayout>
      </TransitionProvider>
    </div>
  );
}

export default MyApp;

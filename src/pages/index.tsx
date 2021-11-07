import type { GetStaticProps, NextPage } from 'next'
import type { ReactElement } from 'react'

export const getStaticProps: GetStaticProps<{}> = async (context) => {
  return { props: { } }
}

const Landing: NextPage = (): ReactElement => {
  return <> </>
}

export default Landing

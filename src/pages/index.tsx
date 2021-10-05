import type { NextPage } from 'next'
import type { ReactElement } from 'react'
import Link from 'next/link'

const Landing: NextPage = (): ReactElement => {
  return (
    <>
      <h2> Swoooosh, touchdown! </h2>
      <Link href='/test'> To Test </Link>
    </>
  )
}

export default Landing

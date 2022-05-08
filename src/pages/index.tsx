import type { GetStaticProps, NextPage } from 'next';
import type { ReactElement } from 'react';

export const getStaticProps: GetStaticProps<Record<string, unknown>> = async () => Promise.resolve({ props: {} });

const Landing: NextPage = (): ReactElement => <> </>;

export default Landing;

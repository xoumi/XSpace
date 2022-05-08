import Link from 'next/link';
import { useRouter } from 'next/router';
import { MutableRefObject, useRef } from 'react';
import useFlip from 'hooks/useFlip';

const routes = [
  { title: 'dev', path: '/dev', color: 'blue' },
  { title: 'life', path: '/life', color: 'green' },
  { title: 'about', path: '/about', color: 'grey' },
];

function Nav(): React.ReactElement {
  const router = useRouter();
  const bgRefs: MutableRefObject<Array<HTMLElement | null>> = useRef([]);
  const titleRefs: MutableRefObject<Array<HTMLElement | null>> = useRef([]);

  useFlip(bgRefs.current);
  useFlip(titleRefs.current);

  function getClassName(route: typeof routes[number]): string {
    const classes = ['route', `${route.color}-theme`];
    classes.push(router.pathname.includes(route.path) ? 'active' : '');
    return classes.join(' ');
  }

  function getLeftShift(): string {
    let leftshift = routes.findIndex((route) => router.pathname.includes(route.path));
    leftshift = leftshift === -1 ? 0 : leftshift;
    return `${leftshift * -320}px`;
  }

  return (
    <nav>
      <ul
        style={{ marginLeft: getLeftShift() }}
        className={`routes-container ${router.pathname !== '/' ? 'active' : ''}`}
      >
        {routes.map((route, i) => (
          <li className={getClassName(route)} key={route.path}>
            <div className='background' ref={function stateChange(el) { bgRefs.current[i] = el !== null ? el : null; }} />
            <Link href={route.path} prefetch={false}>
              <a>
                <h2 className='text-lg' ref={function stateChange(el) { titleRefs.current[i] = el !== null ? el : null; }}>{route.title}</h2>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Nav;

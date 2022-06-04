import { Toc } from 'types/mdx';
import { animate } from 'motion';

interface TocNavI {
  toc: Toc[],
  className?: string
}

function TocNav(props: TocNavI): React.ReactElement {
  function scrollToTag(e: MouseEvent<HTMLAnchorElement, MouseEvent>, tag: string) {
    e.preventDefault();
    history.replaceState(null, '', window.location.pathname + '#' + tag)

    const offset = 0;

    const scrollTo = document.getElementById(tag);
    const scrollToTop = scrollTo?.getBoundingClientRect().top;
    if (scrollToTop) {
      const elementPosition = scrollToTop - 16;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }

  return (
    <nav className={props.className} >
      <div>
        <h3 className="outline">OUTLINE</h3>
        <ul>
          {props.toc.map((heading, index) => (
            <li key={index}>
              <a href={'#' + heading.id} onClick={(e) => scrollToTag(e, heading.id)}>
                {heading.type == 'heading' &&
                  <p style={{ paddingLeft: `calc(.5rem * ${heading.depth - 2})` }}>{heading.value}</p>}
                {heading.type == 'code' && <code>{heading.value}</code>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default TocNav;
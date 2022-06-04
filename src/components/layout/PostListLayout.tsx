import { ReactElement, cloneElement, useState, useEffect, useRef } from 'react';
import type { NextRouter } from 'next/router';
import { format } from 'date-fns'
import { useRouter } from 'next/router';

import {Meta} from 'types/mdx';
import TocNav from 'components/TocNav';


interface PostListLayoutI {
  children: ReactElement
  className: string
}


const PostListLayout: React.FC<PostListLayoutI> = ({ children, className }) => {
  const [meta, setMeta] = useState<Meta | null>(null);

  return (
    <div className={`post-container ${className}`}>
      <div className="article-container">
        {meta?.fm &&
          <header>
            <h1>{meta.fm.title}</h1>
            {
              meta.fm.created
              && <p className="text-xs">{format(new Date(meta.fm.created), 'do MMM, yy')}</p>
            }
          </header>
        }
        {meta?.toc && <TocNav toc={meta.toc} className="mobile tocNav" />}
        {cloneElement(children, { setMeta: setMeta })}
      </div>

      {meta && meta.toc.length && <TocNav toc={meta.toc} className="tocNav desktop" />}
    </div>
);
};

export default PostListLayout;

import { ReactNode } from 'react';
import SimpleBar from 'simplebar-react';

interface PostListLayoutI {
  children: ReactNode
  className: string
}

const PostListLayout: React.FC<PostListLayoutI> = ({ children, className }) => (
    <SimpleBar
      autoHide={false}
      className={`container ${className}`}
    >
      {children}
    </SimpleBar>
);

export default PostListLayout;

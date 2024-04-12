import React, { ReactNode } from 'react';

interface ContentWrapperProps {
  title?: string;
  children: ReactNode;
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({ title, children }) => {
  return (
    <div className="content-wrapper">
      {title && <h4 className="content-wrapper-title">{title}</h4>}
      {children}
    </div>
  );
};

export default ContentWrapper;

import React from 'react';
import Mermaid from '/src/pages/Blog/components/Mermaid';
import { solids } from '/design-system/colors';
import styled from 'styled-components';

const Container = styled.span`
  width: 100%;
  background-color: ${solids.PAPER};
  border-radius: 10px;
  padding: 25px 15px 15px 15px;
  font-family: 'monospace';
  white-space: pre-wrap;
`;

const Parent: React.FC = ({ children }) => <Container>{children}</Container>;

export const Code = ({
  code,
  language,
}: {
  code: string;
  language: string;
}) => {
  if (language.toLowerCase() === 'mermaid') {
    return (
      <Parent>
        <Mermaid chart={code} />
      </Parent>
    );
  }

  return (
    <Parent>
      <code>{code}</code>
    </Parent>
  );
};

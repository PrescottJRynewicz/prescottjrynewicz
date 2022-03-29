import React from 'react';
import Mermaid from '/src/pages/Blog/components/Mermaid';
import styled from 'styled-components';
import { CodeBlock, dracula } from 'react-code-blocks';

const Container = styled.span`
  width: 100%;
`;

const MermaidContainer = styled.span`
  width: 100%;
  background-color: ${dracula.backgroundColor};
  border-radius: 5px;
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
      <MermaidContainer>
        <Mermaid chart={code} />
      </MermaidContainer>
    );
  }

  return (
    <Parent>
      <CodeBlock
        text={code}
        language={language.toLowerCase() === 'plain text' ? 'text' : language}
        showLineNumbers
        theme={dracula}
      />
    </Parent>
  );
};

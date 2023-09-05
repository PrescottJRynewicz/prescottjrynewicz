import React, { ReactNode } from 'react';
import Mermaid from '/src/pages/Blog/components/Mermaid';
import styled from 'styled-components';
import { CodeBlock, tomorrowNightEighties } from 'react-code-blocks';
import { Block, CodeBlock as CodeBlockType } from 'notion-types';
import { speckles } from '/design-system/colors';

const Container = styled.span`
  width: 100%;
`;

const MermaidContainer = styled.span`
  width: 100%;
  border: solid 3px black;
  padding: 10px;
  border-radius: 5px;

  @media (prefers-color-scheme: dark) {
    background-image: url(${speckles.BASIC});
  }
`;

function Parent({ children }: { children: ReactNode }) {
  return <Container>{children}</Container>;
}

export function Code({ block }: { block: Block }) {
  const { title, language } = (block as CodeBlockType).properties;

  if (language && language[0] && language[0][0]) {
    const languageString = language[0][0];

    const code = title
      .map((itemOne) => itemOne.map((itemTwo) => itemTwo.toString()).join())
      .join();

    if (languageString.toLowerCase() === 'mermaid') {
      return (
        <MermaidContainer>
          <Mermaid chart={code} />
        </MermaidContainer>
      );
    }

    return (
      <Parent>
        <CodeBlock
          // @ts-ignore Not sure why this isn't working - this prop exists.
          text={code}
          language={
            languageString.toLowerCase() === 'plain text'
              ? 'text'
              : languageString
          }
          showLineNumbers
          theme={tomorrowNightEighties}
        />
      </Parent>
    );
  }
  return null;
}

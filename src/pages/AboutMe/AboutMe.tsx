import React from 'react';
import Head from 'next/head';
import { AboutMeContainer } from '/src/pages/AboutMe/styled';
import { AboutMeSectionOne } from '/src/pages/AboutMe/SectionOne/AboutMeSectionOne';
import { AboutMeSectionTwo } from '/src/pages/AboutMe/PhotoFirstSections/AboutMeSectionTwo';
import { AboutMeSectionThree } from '/src/pages/AboutMe/SectionThree/AboutMeSectionThree';
import { AboutMeSectionFour } from '/src/pages/AboutMe/PhotoFirstSections/AboutMeSectionFour';

import useSwr from 'swr';

export function AboutMe() {
  const { data, error } = useSwr('api/notion-test');

  console.log(data);
  console.log(error);

  return (
    <AboutMeContainer>
      <Head>
        <title>PJR - About Me</title>
        <meta name="description" content="Prescott's Playground 🎢" />
        <link rel="icon" href="/favicon.png" />
        <meta property="og:image" content="/site-image.png" />
        <meta name="twitter:title" content="PrescottJR" />
        <meta name="twitter:description" content="Prescott's Playground" />
        <meta name="twitter:image" content="/favicon.png" />
        <meta name="twitter:image:alt" content="Prescott's Playground" />
      </Head>
      <AboutMeSectionOne />
      <AboutMeSectionTwo />
      <AboutMeSectionThree />
      <AboutMeSectionFour />
    </AboutMeContainer>
  );
}

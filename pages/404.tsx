import React from 'react';
import Image from 'next/image';
import { PolkaDots } from '/src/components/PolkaDots/PolkaDots';
import { solids } from '/design-system/colors';
import { Menu } from '/src/components/Menu/Menu';

export default function Custom404() {
  return (
    <div
      style={{
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
          maxWidth: '90%',
        }}>
        <h1 style={{ fontSize: '68px' }}>404 - Page Not Found</h1>
        <PolkaDots numDots={100} />
        <Image
          alt="wire connections"
          style={{
            objectFit: 'cover',
            width: '100%',
            height: 'fit-content',
            border: `solid 10px ${solids.PINK_STARBURST}`,
            borderRadius: '20px',
          }}
          width={720}
          height={520}
          src="https://www.datocms-assets.com/105541/1693881173-collect-messages_body_image-4.png"
        />
        <h2>Sorry, the page you are looking for does not exist.</h2>
        <Menu />
      </div>
    </div>
  );
}

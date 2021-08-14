import styles from '/styles/Home.module.css';
import Head from 'next/head';
import Image from 'next/image';
import React, { CSSProperties } from 'react';
import Link from 'next/link';
import { signIn, signOut } from 'next-auth/client';

export default function Home() {
  const buttonStyle: CSSProperties = {
    border: 'solid black',
    padding: '10px',
    backgroundColor: 'transparent',
    margin: '5px',
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>PJR</title>
        <meta name="description" content="Prescott's Playground 🎢" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to my personal website!</h1>

        <p className={styles.description}>
          Explore the example pages in the{' '}
          <code className={styles.code}>/pages</code>
          directory
        </p>

        <div className={styles.grid}>
          <Link href="/static">
            <a style={buttonStyle}>Static Page</a>
          </Link>
          <Link href="/ssr">
            <a style={buttonStyle}>SSR Page</a>
          </Link>
          <Link href="/client">
            <a style={buttonStyle}>Client Rendered Page</a>
          </Link>
        </div>
        <div className={styles.grid}>
          <button style={buttonStyle} type="button" onClick={() => signIn()}>
            Sign In
          </button>
          <button style={buttonStyle} type="button" onClick={() => signOut()}>
            Sign Out
          </button>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer">
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

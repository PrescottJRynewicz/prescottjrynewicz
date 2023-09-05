import localFont from 'next/font/local';

export const Shrimp = localFont({ src: './SHRIMP.ttf' });
export const Brandon = localFont({
  src: [
    {
      path: './Brandon_reg.ttf',
      style: 'normal',
      weight: '200',
    },
    { path: './Brandon_bld.ttf', style: 'bold' },
  ],
});

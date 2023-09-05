import localFont from 'next/font/local';

export const Shrimp = localFont({ src: '../../public/fonts/SHRIMP.ttf' });
export const Brandon = localFont({
  src: [
    {
      path: '../../public/fonts/Brandon_reg.ttf',
      style: 'normal',
      weight: '200',
    },
    { path: '../../public/fonts/Brandon_bld.ttf', style: 'bold' },
  ],
});

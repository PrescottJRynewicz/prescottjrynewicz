import { NextApiRequest, NextApiResponse } from 'next';

const { Client } = require('@notionhq/client');

const blogDatbaseId = 'a7a4a3733f5445d885fecc257f9e5e80';
const notionKey = `secret_wF2JU6392aTNgm92xDmIuBJoxvS74k3wsj0nfxromLj`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Initializing a client
    const notion = new Client({
      auth: notionKey,
    });

    const blogDb = await notion.databases.retrieve({
      database_id: '448687b7a65041588c4816fdf08e4ac1',
    });

    console.log(blogDb);
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({ name: 'John Doe' });
}

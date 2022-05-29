import { Panda, PandaProps } from '/src/pages/Panda/Panda';
import { GetStaticPropsResult } from 'next';
import * as fs from 'fs';
import {
  GraphCache,
  localFileCachePath,
  pandaUserId,
} from '/src/fetchers/panda/constants';

export default Panda;

export async function getStaticProps(): Promise<
  GetStaticPropsResult<PandaProps>
> {
  const graphCache: GraphCache = JSON.parse(
    fs.readFileSync(localFileCachePath).toString()
  );

  const panda = graphCache[pandaUserId];

  return {
    props: {
      panda,
      graph: graphCache,
    },
    revalidate: 10,
  };
}

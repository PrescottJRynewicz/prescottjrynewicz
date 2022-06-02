import { Panda, PandaProps } from '/src/pages/Panda/Panda';
import { GetStaticPropsResult } from 'next';
import { pandaUserId } from '/src/fetchers/panda/constants';
import { minifyPandaGraph } from '/src/fetchers/panda/minifyPandaGraph';

export default Panda;

export async function getStaticProps(): Promise<
  GetStaticPropsResult<PandaProps>
> {
  const graphCache = await minifyPandaGraph();

  const panda = graphCache[pandaUserId];

  return {
    props: {
      panda,
      graph: graphCache,
    },
    revalidate: 10,
  };
}

import { Core, NodeSingular } from 'cytoscape';
import { solids } from '/design-system/colors';
import { pandaUserId } from '/src/fetchers/panda/constants';

export function addNodeAnimation({
  node,
  cytoscapeRef,
}: {
  node: NodeSingular;
  cytoscapeRef: Core;
}) {
  const originalWidth = node.renderedWidth();
  const originalHeight = node.renderedHeight();

  node.unlisten('mouseover');
  node.unlisten('mouseout');
  node.addListener('mouseover', () => {
    node.animate({
      style: {
        width: node.id() === pandaUserId ? originalWidth * 1.2 : 500,
        height: node.id() === pandaUserId ? originalWidth * 1.2 : 500,
        'border-color': solids.PINK_STARBURST,
        'border-width': 20,
      },
      duration: 200,
      easing: 'ease-in-sine',
    });

    node.edgesWith(cytoscapeRef.nodes()).forEach((edge) => {
      edge.css({
        width: 10,
        'line-color': solids.PINK_STARBURST,
        opacity: 1,
      });
    });

    document.body.style.cursor = 'pointer';
  });
  node.addListener('mouseout', () => {
    node.animate({
      style: {
        width: originalWidth,
        height: originalHeight,
        'border-color': solids.DARK_KNIGHT,
        'border-width': 5,
      },
      duration: 200,
      easing: 'ease-in-sine',
    });

    node.edgesWith(cytoscapeRef.nodes()).forEach((edge) => {
      edge.css({
        width: 2,
        'line-color': 'black',
        opacity: 0.1,
      });
    });

    document.body.style.cursor = 'default';
  });

  node.unlisten('click');
  node.addListener('click', () => {
    window.open(`https://www.strava.com/athletes/${node.id()}`);
  });
}

import cytoscape from 'cytoscape';
import { solids } from '/design-system/colors';

export const cytoscapeGraphSpec = {
  boxSelectionEnabled: false,
  layout: {
    // @ts-ignore
    name: 'cola',
    randomize: true,
    infinite: true,
    fit: false,
    nodeSpacing() {
      return 50;
    },
  },
  style: cytoscape
    // @ts-ignore
    .stylesheet()
    .selector('node')
    .css({
      height: 200,
      width: 200,
      'background-fit': 'cover',
      'border-color': solids.DARK_KNIGHT,
      'border-width': 5,
    })
    .selector('edge')
    .css({
      width: 2,
      'target-arrow-shape': 'triangle',
      'line-color': 'black',
      opacity: 0.1,
    }),
};

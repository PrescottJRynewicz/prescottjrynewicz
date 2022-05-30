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
      'border-color': solids.PINK_STARBURST,
      'border-width': 5,
      'border-opacity': 1,
    })
    .selector('edge')
    .css({
      width: 2,
      'target-arrow-shape': 'triangle',
      'line-color': solids.MIMOSA,
    }),
};

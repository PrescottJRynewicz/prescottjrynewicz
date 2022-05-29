import cytoscape from 'cytoscape';

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
      'border-color': '#000',
      'border-width': 3,
      'border-opacity': 1,
    })
    .selector('edge')
    .css({
      width: 2,
      'target-arrow-shape': 'triangle',
      'line-color': 'rbga(0,0,0,0.1)',
      'target-arrow-color': '#000000',
    }),
};

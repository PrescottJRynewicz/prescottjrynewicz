import { NodeSingular } from 'cytoscape';

export function addNodeAnimation({ node }: { node: NodeSingular }) {
  const originalWidth = node.renderedWidth();
  const originalHeight = node.renderedHeight();

  node.unlisten('mouseover');
  node.unlisten('mouseout');
  node.addListener('mouseover', () => {
    node.animate({
      style: {
        width: originalWidth * 1.2,
        height: originalHeight * 1.2,
      },
      duration: 200,
      easing: 'ease-in-sine',
    });

    document.body.style.cursor = 'pointer';
  });
  node.addListener('mouseout', () => {
    node.animate({
      style: { width: originalWidth, height: originalHeight },
      duration: 200,
      easing: 'ease-in-sine',
    });
    document.body.style.cursor = 'default';
  });
}

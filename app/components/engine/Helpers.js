import { getMeasurementsFromDimensions } from 'utils';


export class RollOverBrick extends THREE.Mesh {
  constructor(color, dimensions) {
    // const rollOverGeo = new THREE.EdgesGeometry( new THREE.BoxGeometry( width, height, depth ) ); // or WireframeGeometry( geometry )
    // const mat = new THREE.LineBasicMaterial( { color: color, linewidth: 2 } );
    const { width, height, depth } = getMeasurementsFromDimensions(dimensions);
    const rollOverGeo = new THREE.BoxGeometry( width, height, depth );
    const mat = new THREE.MeshBasicMaterial( { color: 0x08173D, opacity: 0.5, transparent: true } );
    super(rollOverGeo, mat);
  }

  _setShape() {
    // this.geometry = new THREE.EdgesGeometry( new THREE.BoxGeometry( width * 2, height, depth ) ); // or WireframeGeometry( geometry )
  }
}

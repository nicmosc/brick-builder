import { getMeasurementsFromDimensions } from 'utils';


export class RollOverBrick extends THREE.Mesh {
  constructor(color, dimensions) {
    const { width, height, depth } = getMeasurementsFromDimensions(dimensions);
    const rollOverGeo = new THREE.BoxGeometry( width, height, depth );
    const mat = new THREE.MeshBasicMaterial( { color: 0x08173D, opacity: 0.5, transparent: true } );
    super(rollOverGeo, mat);
  }

  _setShape(dimensions) {
    const { width, height, depth } = getMeasurementsFromDimensions(dimensions);
    this.geometry = new THREE.BoxGeometry( width, height, depth );
  }
}

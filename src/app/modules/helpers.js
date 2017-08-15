import { width, height, depth, colors } from '../utils/constants';


export class RollOverBrick extends THREE.LineSegments {
  constructor() {
    const rollOverGeo = new THREE.EdgesGeometry( new THREE.BoxGeometry( width, height, depth ) ); // or WireframeGeometry( geometry )
    const mat = new THREE.LineBasicMaterial( { color: 0x777777, linewidth: 2 } );
    super(rollOverGeo, mat);
  }
}

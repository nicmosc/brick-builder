import { CSSToHex } from 'utils';
import { width, height, depth, colors } from 'utils/constants';


export class RollOverBrick extends THREE.Mesh {
  constructor(color) {
    // const rollOverGeo = new THREE.EdgesGeometry( new THREE.BoxGeometry( width, height, depth ) ); // or WireframeGeometry( geometry )
    // const mat = new THREE.LineBasicMaterial( { color: color, linewidth: 2 } );
    const rollOverGeo = new THREE.BoxGeometry( width, height, depth );
    const mat = new THREE.MeshBasicMaterial( { color: CSSToHex(color), opacity: 0.5, transparent: true } );
    super(rollOverGeo, mat);
  }

  _setShape() {
    // this.geometry = new THREE.EdgesGeometry( new THREE.BoxGeometry( width * 2, height, depth ) ); // or WireframeGeometry( geometry )
  }
}

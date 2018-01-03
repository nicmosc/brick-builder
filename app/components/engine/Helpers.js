import { getMeasurementsFromDimensions } from 'utils';
import { base } from 'utils/constants';


export class RollOverBrick extends THREE.Mesh {
  constructor(color, dimensions) {
    const { width, height, depth } = getMeasurementsFromDimensions(dimensions);
    const rollOverGeo = new THREE.BoxGeometry( width, height, depth );
    const mat = new THREE.MeshBasicMaterial( { color: 0x08173D, opacity: 0.5, transparent: true } );
    super(rollOverGeo, mat);
    this.dimensions = dimensions;
    this.rotated = false;
    this.translation = 0;
  }

  setShape(dimensions) {
    const { width, height, depth } = getMeasurementsFromDimensions(dimensions);
    this.geometry = new THREE.BoxGeometry( width, height, depth );
    this.dimensions = dimensions;
    this.translation = 0;
    this.rotated = false;
  }

  rotate(angle) {
    if (this.rotated) {
      if ((this.dimensions.z % 2 !== 0 && this.dimensions.x % 2 === 0) ||
          (this.dimensions.x % 2 !== 0 && this.dimensions.z % 2 === 0)) {
        this.geometry.translate( base / 2, 0, base / 2 );
        this.translation = 0;
      }
      this.rotateY( -angle );
      this.rotated = false;
    }
    else {
      if ((this.dimensions.z % 2 !== 0 && this.dimensions.x % 2 === 0) ||
          (this.dimensions.x % 2 !== 0 && this.dimensions.z % 2 === 0)) {
        this.geometry.translate( -base / 2, 0, -base / 2 );
        this.translation = - base / 2;
      }
      this.rotateY( angle );
      this.rotated = true;
    }
  }
}

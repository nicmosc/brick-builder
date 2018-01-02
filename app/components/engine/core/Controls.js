const OrbitControls = require('utils/threejs/OrbitControls')(THREE);
// import OrbitControls from 'utils/threejs/OrbitControls';

export class Controls extends OrbitControls {
  init() {
    this.enableDamping = true;
  	this.dampingFactor = 0.15;
    this.rotateSpeed = 0.3;
    this.maxPolarAngle = Math.PI/2;
    this.minDistance = 200;
    this.maxDistance = 6500;
  }
}

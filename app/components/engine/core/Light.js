import { OrthographicCamera } from './Camera';


export class Light extends THREE.SpotLight {
  constructor() {
    super(0xff8c85);
  }
  init() {
    this.position.set( 1000, 1500, 500 );
    this.castShadow = true;
    this.shadow = new THREE.LightShadow( new OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 10000) );
    this.shadow.bias = - 0.0000022;
    this.shadow.mapSize.width = 4096;
    this.shadow.mapSize.height = 4096;
    this.penumbra = 0.5;
    this.decay = 2;
  }
}


export class AmbientLight extends THREE.AmbientLight {
}

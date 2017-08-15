export class Renderer extends THREE.WebGLRenderer {
  init() {
    this.setClearColor( 0xffffff );
    this.setPixelRatio( window.devicePixelRatio );
    this.setSize( window.innerWidth, window.innerHeight );

    this.gammaInput = true;
    this.gammaOutput = true;
    this.shadowMap.enabled = true;
    this.shadowMapSoft = true;
    this.shadowMap.type = THREE.PCFShadowMap;
  }
}

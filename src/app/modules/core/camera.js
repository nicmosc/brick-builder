export class PerspectiveCamera extends THREE.PerspectiveCamera {
  init() {
    this.position.set(600,500,500);
    this.lookAt( new THREE.Vector3() );
  }
}


// const camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 10000 );

export class OrthographicCamera extends THREE.OrthographicCamera {
}

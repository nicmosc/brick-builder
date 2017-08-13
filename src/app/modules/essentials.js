const OrbitControls = require('three-orbit-controls')(THREE);


const Renderer = () => {
  const renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setClearColor( 0xffffff );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );

  renderer.gammaInput = true;
  renderer.gammaOutput = true;
  renderer.shadowMapEnabled = true;
  renderer.shadowMapSoft = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  return renderer;
}

export const renderer = Renderer();


const Scene = () => {
  return new THREE.Scene();
};

export const scene = Scene();


const Camera = () => {
  const camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 10000 );
  camera.position.set(600,500,500);
  camera.lookAt( new THREE.Vector3() );
  return camera;
}

export const camera = Camera();


const Controls = () => {
  const controls = new OrbitControls( camera, renderer.domElement );
	controls.enableDamping = true;
	controls.dampingFactor = 0.25;
  return controls;
}

export const controls = Controls();

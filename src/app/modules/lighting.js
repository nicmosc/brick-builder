const Lighting = () => {
  var light = new THREE.SpotLight( 0xffffff, 2 );
  light.position.set( 1000, 1500, 500 );
  light.castShadow = true;
  light.shadow = new THREE.LightShadow( new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 10000 ) );
  light.shadow.bias = - 0.0000022;
  light.shadow.mapSize.width = 4096;
  light.shadow.mapSize.height = 4096;
  return light;
}

export const lighting = Lighting();


const AmbientLighting = () => {
  return new THREE.AmbientLight( 0x606060 );
};

export const ambientLighting = AmbientLighting();

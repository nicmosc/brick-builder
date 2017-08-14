const Plane = () => {
  const size = 3000;
  const geometry = new THREE.PlaneBufferGeometry( size, size );
  geometry.rotateX( - Math.PI / 2 );
  const planeMaterial = new THREE.ShadowMaterial();
  planeMaterial.opacity = 0.2;
  const plane = new THREE.Mesh( geometry, planeMaterial );
  plane.receiveShadow = true;
  return plane;
}

export const plane = Plane();


const Grid = () => {
  const grid = new THREE.GridHelper( 3000, 240 );
  return grid;
}


export const grid = Grid();

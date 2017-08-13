import { mergeMeshes } from '../utils';


const colors = ['0xb9140a', '0x1e6914', '0x1a3fcc', '0xd49417'];
const dimensions = 50;


const RollOverMesh = () => {
  const rollOverGeo = new THREE.EdgesGeometry( new THREE.BoxGeometry( 50, 50, 50 ) ); // or WireframeGeometry( geometry )
  const mat = new THREE.LineBasicMaterial( { color: 0x777777, linewidth: 2 } );
  return new THREE.LineSegments( rollOverGeo, mat );
}

export const rollOverMesh = RollOverMesh();


// BRICKS

function createCube(material) {
  let meshes = [];
  const cubeGeo = new THREE.BoxGeometry( dimensions, dimensions, dimensions );
  const cylinderGeo = new THREE.CylinderGeometry( 7, 7, 7, 20);

  const mesh = new THREE.Mesh(cubeGeo, material);
  meshes.push(mesh);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  const positions = [
    {x: 12, y: 25, z: - 12},
    {x: - 12, y: 25, z: 12},
    {x: - 12, y: 25, z: - 12},
    {x: 12, y: 25, z: 12}
  ];

  for (var i = 0; i < positions.length; i++) {
    const cylinder = new THREE.Mesh(cylinderGeo, material);

    cylinder.position.x = positions[i].x + 2;
    cylinder.position.y = positions[i].y;
    cylinder.position.z = positions[i].z + 2;

    cylinder.castShadow = true;
    cylinder.receiveShadow = true;
    meshes.push( cylinder );
  }

  const brickGeometry = mergeMeshes(meshes);
  return new THREE.Mesh(brickGeometry, material);;
}


export const Brick = (intersect, color) => {
  const cubeMaterial = new THREE.MeshLambertMaterial( { color: parseInt(color, 16 ) } );
  const brick = createCube(cubeMaterial);

  brick.position.copy( intersect.point ).add( intersect.face.normal );
  brick.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
  brick.castShadow = true;
  brick.receiveShadow = true;

  return brick;
};

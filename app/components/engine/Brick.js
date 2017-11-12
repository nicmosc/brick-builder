import { mergeMeshes } from 'utils/threejs';
import { CSSToHex, shadeColor } from 'utils';
import { width, height, depth } from 'utils/constants';


export default class Brick extends THREE.Mesh {
  constructor(intersect, color) {
    const cubeMaterial = new THREE.MeshStandardMaterial({
      color: CSSToHex(color),
      // specular: CSSToHex(shadeColor(color, -20)),
      // shininess: 5,
      metalness: 0.4,
      roughness: 0.5,
    });
    const props = createMesh(cubeMaterial);
    super(...props);

    this.position.copy( intersect.point ).add( intersect.face.normal );
    this.position.divide( new THREE.Vector3(width / 2, height, depth / 2) ).floor()
      .multiply( new THREE.Vector3(width / 2, height, depth / 2) )
      .add( new THREE.Vector3( width / 2, height / 2, depth / 2 ) );
    this.castShadow = true;
    this.receiveShadow = true;
  }

  updateColor(color) {
    // this.material.color = CSSToHex(color);
    this.material.setValues({ color: CSSToHex(color) });
  }
}


function createMesh(material) {
  let meshes = [];
  const cubeGeo = new THREE.BoxGeometry( width, height, depth );
  const cylinderGeo = new THREE.CylinderGeometry( 7, 7, 7, 20);

  const mesh = new THREE.Mesh(cubeGeo, material);
  meshes.push(mesh);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  const positions = [
    {x: 13, y: 25 / 1.5, z: - 13},
    {x: - 13, y: 25 / 1.5, z: 13},
    {x: - 13, y: 25 / 1.5, z: - 13},
    {x: 13, y: 25 / 1.5, z: 13}
  ];

  for (var i = 0; i < positions.length; i++) {
    const cylinder = new THREE.Mesh(cylinderGeo, material);

    cylinder.position.x = positions[i].x;
    cylinder.position.y = positions[i].y;
    cylinder.position.z = positions[i].z;

    cylinder.castShadow = true;
    cylinder.receiveShadow = true;
    meshes.push( cylinder );
  }

  const brickGeometry = mergeMeshes(meshes);
  return [brickGeometry, material];
}

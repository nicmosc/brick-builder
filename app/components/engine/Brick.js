import v4 from 'uuid';

import { mergeMeshes, degToRad } from 'utils/threejs';
import BufferSubdivisionModifier from 'utils/threejs/BufferSubdivisionModifier';
import { CSSToHex, shadeColor, getMeasurementsFromDimensions } from 'utils';
import { base } from 'utils/constants';


const knobSize = 7;


export default class Brick extends THREE.Mesh {
  constructor(intersect, color, dimensions, rotation, translation) {
    const cubeMaterial = new THREE.MeshStandardMaterial({
      color: CSSToHex(color),
      // specular: CSSToHex(shadeColor(color, -20)),
      // shininess: 5,
      metalness: 0.4,
      roughness: 0.5,
    });
    const { height, width, depth } = getMeasurementsFromDimensions(dimensions);
    const props = createMesh(cubeMaterial, width, height, depth, dimensions);
    super(...props);

    const evenWidth = dimensions.x % 2 === 0;
    const evenDepth = dimensions.z % 2 === 0;

    this.height = height;
    this.width = width;
    this.depth = depth;
    this.position.copy( intersect.point ).add( intersect.face.normal );
    this.position.divide( new THREE.Vector3(base, height, base) ).floor()
      .multiply( new THREE.Vector3(base, height, base) )
      .add( new THREE.Vector3( evenWidth ? base : base / 2, height / 2, evenDepth ? base : base / 2 ) );
    this.rotation.y = rotation;
    this.geometry.translate(translation, 0, translation);
    this.castShadow = true;
    this.receiveShadow = true;
    this.customId = v4();
    this.defaultColor = cubeMaterial.color;

    this._intersect = intersect;
    this._color = color;
    this._dimensions = dimensions;
    this._rotation = rotation;
    this._translation = translation;
  }

  updateColor(color) {
    this.material.setValues({ color: CSSToHex(color) });
    this.defaultColor = this.material.color;
    this._color = color;
  }

  // rotate(rotation) {
  //   this.rotateY(degToRad(rotation));
  // }
}


function createMesh(material, width, height, depth, dimensions) {
  let meshes = [];
  const cubeGeo = new THREE.BoxGeometry( width - 0.1, height - 0.1, depth - 0.1 );
  const cylinderGeo = new THREE.CylinderGeometry( knobSize, knobSize, knobSize, 20);

  // const modifier = new THREE.BufferSubdivisionModifier( 2 );
  // const smooth = modifier.modify( cubeGeo );

  const mesh = new THREE.Mesh(cubeGeo, material);
  meshes.push(mesh);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  for ( var i = 0; i < dimensions.x; i++ ) {
    for ( var j = 0; j < dimensions.z; j++ ) {
      const cylinder = new THREE.Mesh(cylinderGeo, material);
      cylinder.position.x = base * i - ((dimensions.x - 1) * base / 2),
      cylinder.position.y = base / 1.5,  // TODO to be reworked
      cylinder.position.z = base * j - ((dimensions.z - 1) * base / 2),

      cylinder.castShadow = true;
      cylinder.receiveShadow = true;
      meshes.push( cylinder );
    }
  }

  const brickGeometry = mergeMeshes(meshes);
  return [brickGeometry, material];
}

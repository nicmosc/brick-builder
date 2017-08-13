import $ from 'jquery';
import Detector from './utils/detector';

import { lighting, ambientLighting } from './modules/lighting';
import { renderer, scene, camera, controls } from './modules/essentials';


if ( ! Detector.webgl ) Detector.addGetWebGLMessage();


init();


function init() {
  const canvas = $('#canvas')[0];
  canvas.appendChild( renderer.domElement );

  setUpScene();

  animate();
}


function setUpScene() {
  scene.add(lighting);
  scene.add(ambientLighting);

  // test
  const cubeGeo = new THREE.BoxGeometry( 50, 50, 50 );
  var mesh = new THREE.Mesh(cubeGeo, new THREE.MeshLambertMaterial( { color: parseInt('0xb9140a', 16 ) } ));
  mesh.position.x = 0;
  mesh.position.y = 0;
  mesh.position.z = 0;
  scene.add(mesh);
}


function animate() {
  requestAnimationFrame(animate);
  controls.update();
  render();
}


function render() {
  renderer.render(scene, camera);
}

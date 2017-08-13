import $ from 'jquery';
import Detector from './utils/detector';

import { lighting, ambientLighting } from './modules/lighting';
import { renderer, scene, camera, controls } from './modules/essentials';
import { rollOverMesh, Brick } from './modules/bricks';
import { plane, grid } from './modules/plane';


if ( ! Detector.webgl ) Detector.addGetWebGLMessage();



let objects = [];
let raycaster, mouse;


init();


function init() {
  const canvas = $('#canvas')[0];
  canvas.appendChild( renderer.domElement );

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  setUpScene();
  attachEvents();
  animate();
}


function setUpScene() {
  scene.add(lighting);
  scene.add(ambientLighting);

  scene.add(rollOverMesh);
  scene.add(plane);
  scene.add(grid);

  objects.push(plane);
}


function attachEvents() {
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  document.addEventListener( 'mousedown', onDocumentMouseDown, false );
  // document.addEventListener( 'keydown', onDocumentKeyDown, false );
  // document.addEventListener( 'keyup', onDocumentKeyUp, false );

  // window.addEventListener( 'resize', onWindowResize, false );
}


function onDocumentMouseMove( event ) {
  event.preventDefault();
  mouse.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
  raycaster.setFromCamera( mouse, camera );
  const intersects = raycaster.intersectObjects( objects );
  if ( intersects.length > 0 ) {
    const intersect = intersects[ 0 ];
    rollOverMesh.position.copy( intersect.point ).add( intersect.face.normal );
    rollOverMesh.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
  }
}


function onDocumentMouseDown( event ) {
  event.preventDefault();
  mouse.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
  raycaster.setFromCamera( mouse, camera );
  var intersects = raycaster.intersectObjects( objects );
  if ( intersects.length > 0 ) {
    var intersect = intersects[ 0 ];
    // delete cube
    // if ( isShiftDown ) {
    //   deleteCube(intersect);
    // // create cube
    // } else {
      // var randomCol = colors[Math.floor(Math.random()*colors.length)];
      const brick = Brick(intersect, '0xb9140a');
      scene.add(brick);
      objects.push( brick );
    // }
  }
}


function animate() {
  requestAnimationFrame(animate);
  controls.update();
  render();
}


function render() {
  renderer.render(scene, camera);
}

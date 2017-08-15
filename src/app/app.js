import $ from 'jquery';
import Detector from './utils/detector';

import { Light, AmbientLight, OrthographicCamera, Renderer, Controls, PerspectiveCamera, Scene } from './modules/core';
import { RollOverBrick } from './modules/helpers';
import { Brick } from './modules/brick';
import { Plane } from './modules/plane';
import { width, height, depth } from './utils/constants';


if ( ! Detector.webgl ) Detector.addGetWebGLMessage();


// core
let renderer, controls, camera, scene;
// env
let light, ambientLight, plane, grid;

let rollOverBrick;
let objects = [];
let raycaster, mouse, axisHelper;
let drag = false;
let isShiftDown = false;
let intersection = false;


init();


function init() {
  // core
  initCore();
  // env
  initEnv();
  // helpers
  rollOverBrick = new RollOverBrick();
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  // axisHelper = new THREE.AxisHelper( 100 );
  // axisHelper.position.y = 5;
  setUpScene();
  attachEvents();
  animate();
}


function initCore() {
  scene = new Scene();
  renderer = new Renderer({ antialias: true });
  renderer.init();
  camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
  camera.init();
  controls = new Controls(camera, renderer.domElement);
  controls.init();

  const canvas = $('#canvas')[0];
  canvas.appendChild( renderer.domElement );
}


function initEnv() {
  light = new Light(0xffffff, 2);
  light.init();
  ambientLight = new AmbientLight(0x606060);
  plane = new Plane(3000);
  grid = new THREE.GridHelper( 3000, 240 );
}


function setUpScene() {
  // scene.add(axisHelper);

  scene.add(light);
  scene.add(ambientLight);

  scene.add(rollOverBrick);
  scene.add(plane);
  scene.add(grid);

  objects.push(plane);
}


function attachEvents() {
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  document.addEventListener( 'mousedown', onDocumentMouseDown, false );
  document.addEventListener( 'mouseup', onDocumentMouseUp, false );
  document.addEventListener( 'keydown', onDocumentKeyDown, false );
  document.addEventListener( 'keyup', onDocumentKeyUp, false );

  window.addEventListener( 'resize', onWindowResize, false );
}


function onDocumentMouseMove( event ) {
  event.preventDefault();
  drag = true;
  mouse.set( ( (event.clientX / window.innerWidth) ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
  raycaster.setFromCamera( mouse, camera );
  const intersects = raycaster.intersectObjects( objects, true );
  if ( intersects.length > 0 && ! isShiftDown) {
    const intersect = intersects[ 0 ];

    rollOverBrick.position.copy( intersect.point ).add( intersect.face.normal );
    rollOverBrick.position.divide( new THREE.Vector3(width / 2, height, depth / 2) ).floor()
      .multiply( new THREE.Vector3( width / 2, height, depth / 2 ) )
      .add( new THREE.Vector3( width / 2, height / 2, depth / 2 ) );
  }
}


function onDocumentMouseDown( event ) {
  drag = false;
}


function onDocumentMouseUp(event) {
  event.preventDefault();
  if (! drag) {
    mouse.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( objects );
    if ( intersects.length > 0 ) {
      var intersect = intersects[ 0 ];
      // delete cube
      if ( isShiftDown ) {
        deleteCube(intersect);
      // create cube
      } else {
        let canCreate = true;
        const bricks = objects.filter((o) => o.geometry.type === 'Geometry');
        const meshBoundingBox = new THREE.Box3().setFromObject(rollOverBrick);
        for (var i = 0; i < bricks.length; i++) {
          const brickBoundingBox = new THREE.Box3().setFromObject(bricks[i]);
          const collision = meshBoundingBox.intersectsBox(brickBoundingBox);
          if (collision) {
            const dx = Math.abs(brickBoundingBox.max.x - meshBoundingBox.max.x);
            const dz = Math.abs(brickBoundingBox.max.z - meshBoundingBox.max.z);
            const yIntsersect = brickBoundingBox.max.y - 9 > meshBoundingBox.min.y;
            if (yIntsersect && dx !== width && dz !== depth) {
              canCreate = false;
              break;
            }
          }
        }
        if (canCreate) {
          const brick = new Brick(intersect);
          scene.add(brick);
          objects.push( brick );
        }
      }
    }
  }
}


function deleteCube(intersect) {
  if ( intersect.object != plane ) {
    scene.remove( intersect.object );
    objects.splice( objects.indexOf( intersect.object ), 1 );
  }
}


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}


function onDocumentKeyDown( event ) {
  switch( event.keyCode ) {
    case 16:
      isShiftDown = true;
      rollOverBrick.visible = false;
      break;
  }
}


function onDocumentKeyUp( event ) {
  switch ( event.keyCode ) {
    case 16:
      isShiftDown = false;
      rollOverBrick.visible = true;
      break;
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

import React from 'react';
import PubSub from 'pubsub-js';
const OrbitControls = require('three-orbit-controls')(THREE);

import Detector from 'utils/threejs/detector';
import Monitor from 'components/engine/Monitor';
import { RollOverBrick } from 'components/engine/Helpers';
import {
  PerspectiveCamera,
  Controls,
  AmbientLight,
  Light,
  Plane,
  Renderer,
} from 'components/engine/core';

import { width, height, depth } from 'utils/constants';


// placeholder
let color = 0xb9140a;


class Scene extends React.Component {
  state = {
    drag: false,
    isShiftDown: false,
    intersection: false,
    objects: [],
  }

  constructor(props) {
    super(props);

    this._start = this._start.bind(this);
    this._stop = this._stop.bind(this);
    this._animate = this._animate.bind(this);
  }

  componentDidMount() {
    if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

    this._initCore();
    this._initEnv();
    this._initUtils();

    this._setEventListeners();
    this._start();
  }

  _initCore() {
    const scene = new THREE.Scene();
    this.scene = scene;

    const renderer = new Renderer({ antialias: true });
    renderer.init(window.innerWidth, window.innerHeight);
    this.renderer = renderer;

    const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.init();
    this.camera = camera;

    const controls = new Controls(this.camera, this.renderer.domElement);
    controls.init();
    this.controls = controls;

    this.mount.appendChild(this.renderer.domElement);
  }

  _initEnv() {
    const light = new Light(0xffffff, 2);
    light.init();
    this.scene.add(light);

    const ambientLight = new AmbientLight(0x606060);
    this.scene.add(ambientLight);

    const plane = new Plane(3000);
    this.scene.add(plane);

    const grid = new THREE.GridHelper( 3000, 240 );
    this.scene.add(grid);

    this.setState({
      objects: [ ...this.state.objects, plane ],
    });
  }

  _initUtils() {
    const rollOverBrick = new RollOverBrick(color);
    this.rollOverBrick = rollOverBrick;
    const raycaster = new THREE.Raycaster();
    this.raycaster = raycaster;
    const mouse = new THREE.Vector2();
    this.mouse = mouse;
  }

  _setEventListeners() {
    document.addEventListener( 'mousemove', (event) => this._onDocumentMouseMove(event, this), false );
    // document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    // document.addEventListener( 'mouseup', onDocumentMouseUp, false );
    // document.addEventListener( 'keydown', onDocumentKeyDown, false );
    // document.addEventListener( 'keyup', onDocumentKeyUp, false );
    window.addEventListener('resize', (event) => this._onWindowResize(event, this), false);
  }

  _onWindowResize(event, scene) {
    scene.camera.aspect = window.innerWidth / window.innerHeight;
    scene.camera.updateProjectionMatrix();
    scene.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  _onDocumentMouseMove(event, scene) {
    const { isShiftDown, objects } = this.state;
    event.preventDefault();
    const drag = true;
    scene.mouse.set( ( (event.clientX / window.innerWidth) ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
    scene.raycaster.setFromCamera( scene.mouse, scene.camera );
    const intersects = scene.raycaster.intersectObjects( objects, true );
    if ( intersects.length > 0 && ! isShiftDown) {
      const intersect = intersects[ 0 ];
      scene.rollOverBrick.position.copy( intersect.point ).add( intersect.face.normal );
      scene.rollOverBrick.position.divide( new THREE.Vector3( width / 2, height, depth / 2) ).floor()
        .multiply( new THREE.Vector3( width / 2, height, depth / 2 ) )
        .add( new THREE.Vector3( width / 2, height / 2, depth / 2 ) );
    }
    this.setState({
      drag,
    });
  }


  _start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this._animate);
    }
  }

  _stop() {
    cancelAnimationFrame(this.frameId);
  }

  _animate() {
    this.controls.update();
    PubSub.publish('monitor');

    // just testing
    this._renderScene();
    this.frameId = window.requestAnimationFrame(this._animate);
  }

  _renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return(
      <div>
        <div ref={(mount) => { this.mount = mount }} />
        <Monitor />
      </div>
    );
  }
}


export default Scene;

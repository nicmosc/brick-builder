import React from 'react';
import PubSub from 'pubsub-js';
const OrbitControls = require('three-orbit-controls')(THREE);

import Detector from 'utils/threejs/detector';
import Monitor from 'components/engine/Monitor';
import Brick from 'components/engine/Brick';
import { RollOverBrick } from 'components/engine/Helpers';
import {
  PerspectiveCamera,
  Controls,
  AmbientLight,
  Light,
  Plane,
  Renderer,
} from 'components/engine/core';
import { CSSToHex } from 'utils';
import { width, height, depth, colors } from 'utils/constants';

import styles from 'styles/components/scene';


class Scene extends React.Component {
  state = {
    drag: false,
    isShiftDown: false,
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

  componentDidUpdate(prevProps) {
    const { mode } = this.props;
    if (mode !== prevProps.mode && mode === 'paint') {
      this.rollOverBrick.visible = false;
    }
    else if (mode !== prevProps.mode && mode === 'build') {
      this.rollOverBrick.visible = true;
    }
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

    // testing
    const pointLight = new THREE.PointLight( 0xfff0f0, 0.6, 100, 0 );
    pointLight.position.set( -1000, 1500, 500 );
    this.scene.add( pointLight );

    const plane = new Plane(3000);
    this.plane = plane;
    this.scene.add(plane);

    const grid = new THREE.GridHelper( 3000, 240, new THREE.Color( 0xbfbfbf ), new THREE.Color( 0xdedede ) );
    this.scene.add(grid);

    this.setState({
      objects: [ ...this.state.objects, plane ],
    });
  }

  _initUtils() {
    const { brickColor } = this.props;
    const rollOverBrick = new RollOverBrick(brickColor);
    this.scene.add(rollOverBrick);
    this.rollOverBrick = rollOverBrick;
    const raycaster = new THREE.Raycaster();
    this.raycaster = raycaster;
    const mouse = new THREE.Vector2();
    this.mouse = mouse;
  }

  _setEventListeners() {
    document.addEventListener( 'mousemove', (event) => this._onMouseMove(event, this), false );
    document.addEventListener( 'mousedown', (event) => this._onMouseDown(event), false );
    document.addEventListener( 'mouseup', (event) => this._onMouseUp(event, this), false );
    document.addEventListener( 'keydown', (event) => this._onKeyDown(event, this), false );
    document.addEventListener( 'keyup', (event) => this._onKeyUp(event, this), false );
    window.addEventListener('resize', (event) => this._onWindowResize(event, this), false);
  }

  _onWindowResize(event, scene) {
    scene.camera.aspect = window.innerWidth / window.innerHeight;
    scene.camera.updateProjectionMatrix();
    scene.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  _onMouseMove(event, scene) {
    const { isShiftDown, objects } = this.state;
    const { mode } = this.props;
    event.preventDefault();
    const drag = true;
    this.setState({ drag });
    scene.mouse.set( ( (event.clientX / window.innerWidth) ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
    scene.raycaster.setFromCamera( scene.mouse, scene.camera );
    const intersects = scene.raycaster.intersectObjects( objects, true );
    if ( intersects.length > 0) {
      const intersect = intersects[ 0 ];
      if (! isShiftDown) {
        scene.rollOverBrick.position.copy( intersect.point ).add( intersect.face.normal );
        scene.rollOverBrick.position.divide( new THREE.Vector3( width / 2, height, depth / 2) ).floor()
          .multiply( new THREE.Vector3( width / 2, height, depth / 2 ) )
          .add( new THREE.Vector3( width / 2, height / 2, depth / 2 ) );
      }
      if (intersect.object instanceof Brick && (isShiftDown || mode === 'paint')) {
        this.setState({ brickHover: true });
      }
      else {
        this.setState({ brickHover: false });
      }
    }
  }

  _onMouseDown( event ) {
    this.setState({
      drag: false,
    });
  }

  _onMouseUp(event, scene) {
    const { mode } = this.props;
    const { drag, objects, isShiftDown } = this.state;
    if (event.target.localName !== 'canvas') return;
    event.preventDefault();
    if (! drag) {
      scene.mouse.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
      scene.raycaster.setFromCamera( scene.mouse, scene.camera );
      const intersects = scene.raycaster.intersectObjects( objects );
      if ( intersects.length > 0 ) {
        const intersect = intersects[ 0 ];
        if (mode === 'build') {
          // delete cube
          if ( isShiftDown ) {
            this._deleteCube(intersect);
          // create cube
          } else {
            this._createCube(intersect);
          }
        }
        else if (mode === 'paint') {
          this._paintCube(intersect);
        }
      }
    }
  }

  _createCube(intersect) {
    const { objects } = this.state;
    const { brickColor } = this.props;
    let canCreate = true;
    const bricks = objects.filter((o) => o.geometry.type === 'Geometry');
    const meshBoundingBox = new THREE.Box3().setFromObject(this.rollOverBrick);
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
      const brick = new Brick(intersect, brickColor);
      this.scene.add(brick);
      this.setState({
        objects: [ ...objects, brick],
      });
    }
  }

  _deleteCube(intersect) {
    const { objects } = this.state;
    if (intersect.object != this.plane) {
      this.scene.remove(intersect.object);
      // fix below
      this.setState({
        objects: objects.filter((o) => o !== intersect.object),
      });
    }
  }

  _paintCube(intersect) {
    const { brickColor } = this.props;
    if (intersect.object != this.plane) {
      intersect.object.updateColor(brickColor);
    }
  }

  _onKeyDown(event, scene) {
    switch(event.keyCode) {
      case 16:
        scene.setState({
          isShiftDown: true,
        });
        scene.rollOverBrick.visible = false;
        break;
    }
  }

  _onKeyUp(event, scene ) {
    const { mode } = this.props;
    switch (event.keyCode) {
      case 16:
        scene.setState({
          isShiftDown: false,
        });
        scene.rollOverBrick.visible = true && mode === 'build';
        break;
    }
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
    const { brickHover } = this.state;
    return(
      <div>
        <div className={styles.scene} style={{  cursor: brickHover ? 'pointer' : 'default' }} ref={(mount) => { this.mount = mount }} />
        <Monitor />
      </div>
    );
  }
}


export default Scene;

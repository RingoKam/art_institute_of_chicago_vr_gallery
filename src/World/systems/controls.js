import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import { Vector3 } from 'three'

function createControls(camera, canvas) {
  // const controls = new OrbitControls(camera, canvas);
  // controls.enableDamping = true;

  // const controls = new FirstPersonControls(camera, canvas);
  // controls.constrainVertical = true;
  // controls.movementSpeed = 10
  // controls.dragToLook = true;
  // controls.movementSpeed = 10;
  // controls.rollSpeed = 0.5;
  
  let moveForward = false
  let moveBackward = false
  let moveRight = false
  let moveLeft = false
  let velocity = new Vector3(0,0,0);
  let direction = new Vector3(0,0,0);
  const controls = new PointerLockControls(camera, canvas)
  
  const onKeyDown = function (event) {
    switch (event.code) {
      case 'ArrowUp':
      case 'KeyW':
        moveForward = true;
        break;

      case 'ArrowLeft':
      case 'KeyA':
        moveLeft = true;
        break;

      case 'ArrowDown':
      case 'KeyS':
        moveBackward = true;
        break;

      case 'ArrowRight':
      case 'KeyD':
        moveRight = true;
        break;
    }

  };
  const onKeyUp = function (event) {
    switch (event.code) {
      case 'ArrowUp':
      case 'KeyW':
        moveForward = false;
        break;
      case 'ArrowLeft':
      case 'KeyA':
        moveLeft = false;
        break;
      case 'ArrowDown':
      case 'KeyS':
        moveBackward = false;
        break;
      case 'ArrowRight':
      case 'KeyD':
        moveRight = false;
        break;
    }
  };

  window.document.addEventListener( 'keydown', onKeyDown );
  window.document.addEventListener( 'keyup', onKeyUp );
  controls.addEventListener('lock', function () {
    // menu.style.display = 'none';
  });

  controls.addEventListener('unlock', function () {
    // menu.style.display = 'block';
  });

  canvas.addEventListener('click', function () {
    controls.lock();
  });

  controls.tick = (delta) => {
    // controls.update(delta)
    velocity.x -= velocity.x * 15.0 * delta;
    velocity.z -= velocity.z * 15.0 * delta;
    direction.z = Number( moveForward ) - Number( moveBackward );
    direction.x = Number( moveRight ) - Number( moveLeft );
    direction.normalize();


    if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
    if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;
  
    if(isNaN(direction.z) || isNaN(velocity.z)) {
      return
    }

    controls.moveRight( -1 * velocity.x * delta );
    controls.moveForward( -1 * velocity.z * delta );
    controls.getObject().position.y += ( velocity.y * delta );
  }

  return controls;
}

export { createControls };

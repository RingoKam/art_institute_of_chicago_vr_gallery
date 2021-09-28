import TWEEN from '@tweenjs/tween.js/dist/tween.esm.js';
import { emitter } from "../../emitter"
import { createBlinkerSphere } from '../../components/blinker_sphere'
import { AdditiveBlending, Mesh, Vector3, BufferGeometry, BufferAttribute, Line, LineBasicMaterial, PointLight, TextureLoader, PlaneGeometry, MeshBasicMaterial } from 'three'

const g = new Vector3(0, -9.8, 0);
const tempVec = new Vector3();
const tempVec1 = new Vector3();
const tempVecP = new Vector3();
const tempVecV = new Vector3();

// Guideline parabola function
function positionAtT(inVec,t,p,v,g) {
    inVec.copy(p);
    inVec.addScaledVector(v,t);
    inVec.addScaledVector(g,0.5*t**2);
    return inVec;
}

// The guideline
const lineSegments = 10;
const lineGeometry = new BufferGeometry();
const lineGeometryVertices = new Float32Array((lineSegments + 1) * 3);
lineGeometryVertices.fill(0);
const lineGeometryColors = new Float32Array((lineSegments + 1) * 3);
lineGeometryColors.fill(0.5);
lineGeometry.setAttribute('position', new BufferAttribute(lineGeometryVertices, 3));
lineGeometry.setAttribute('color', new BufferAttribute(lineGeometryColors, 3));
const lineMaterial = new LineBasicMaterial({ vertexColors: true, blending: AdditiveBlending });
const guideline = new Line(lineGeometry, lineMaterial);

// The light at the end of the line
const guideLight = new PointLight(0xffeeaa, 0, 2);

// The target on the ground
const guideSpriteTexture = new TextureLoader().load('./target.png');
const guideSprite = new Mesh(
    new PlaneGeometry(0.3, 0.3, 1, 1),
    new MeshBasicMaterial({
        map: guideSpriteTexture,
        blending: AdditiveBlending,
        color: 0x555555,
        transparent: true
    })
);

let guidingController = null;

export class Locomotion {

    constructor(cameraGroup, camera, scene, renderer, controller1, controller2) {
        this.renderer = renderer
        this.cameraGroup = cameraGroup
        this.camera = camera
        this.scene = scene
        this.controller1 = controller1
        this.controller2 = controller2

        this.guidingController = null
        this.blinkerSphere = createBlinkerSphere()
        this.camera.add(this.blinkerSphere)

        //rotation
        emitter.on('axes0MoveMiddle', this.handleMove, true);
        emitter.on('axes2MoveMiddle', this.handleMove, true);

        //movement
        emitter.on('axes1MoveMiddle', this.handleUp, true);
        emitter.on('axes3MoveMiddle', this.handleUp, true);
        emitter.on('axes1MoveEnd', this.handleUpEnd, true);
        emitter.on('axes3MoveEnd', this.handleUpEnd, true);

        this.controller1.addEventListener('selectstart', (e) => this.onSelectStart(e));
        this.controller1.addEventListener('selectend', (e) =>  this.onSelectEnd(e));
        this.controller2.addEventListener('selectstart', (e) => this.onSelectStart(e));
        this.controller2.addEventListener('selectend', (e) => this.onSelectEnd(e));
    }

    handleMove({ detail }) {
        // Turn left
        if (detail.value > 0) {
            this.cameraGroup.rotation.y -= Math.PI / 4;
        }
        // Turn right
        if (detail.value < 0) {
            this.cameraGroup.rotation.y += Math.PI / 4;
        }
    }

    handleUp({ detail }) {
        if (detail.value < 0) {
            this.onSelectStart(detail.controller);
        }
    }

    handleUpEnd({ detail }) {
        this.onSelectEnd(detail.controller);
    }

    onSelectStart(e) {
        // This is e.data is an XRInputSource and if 
        // it has a hand and being handled by hand tracking so do nothing
        if (e && e.data && e.data.hand) {
            return;
        }

        const controller = e.target;

        console.log("startGuide", controller);

        this.guidingController = controller;
        guideLight.intensity = 1;
        controller.add(guideline);
        // scene.add(guideSprite);
    }

    onSelectEnd(controller) {
        console.log("onSelectEnd", controller);
        console.log(this.guidingController);
        if (this.guidingController === controller.target) {

            // first work out vector from feet to cursor

            // feet position
            const feetPos = this.renderer.xr.getCamera(this.camera).getWorldPosition(tempVec);
            feetPos.y = 0;

            // cursor position
            const p = this.guidingController.getWorldPosition(tempVecP);
            const v = this.guidingController.getWorldDirection(tempVecV);
            v.multiplyScalar(6);
            const t = (-v.y + Math.sqrt(v.y ** 2 - 2 * p.y * g.y)) / g.y;
            const cursorPos = positionAtT(tempVec1, t, p, v, g);

            // Offset
            const offset = cursorPos.addScaledVector(feetPos, -1);

            // Do the locomotion
            this.move(offset);

            // clean up
            this.guidingController.remove(guideline);
            this.guidingController = null;
            guideLight.intensity = 0;
            this.scene.remove(guideSprite);
        }
    }

    tick() {
        if (this.guidingController) {
            // Controller start position
            const p = this.guidingController.getWorldPosition(tempVecP);

            // Set Vector V to the direction of the controller, at 1m/s
            const v = this.guidingController.getWorldDirection(tempVecV);

            // Scale the initial velocity to 6m/s
            v.multiplyScalar(6);

            // Time for tele ball to hit ground
            const t = (-v.y + Math.sqrt(v.y ** 2 - 2 * p.y * g.y)) / g.y;

            const vertex = tempVec.set(0, 0, 0);
            for (let i = 1; i <= lineSegments; i++) {

                // set vertex to current position of the virtual ball at time t
                positionAtT(vertex, i * t / lineSegments, p, v, g);
                this.guidingController.worldToLocal(vertex);
                vertex.toArray(lineGeometryVertices, i * 3);
            }
            guideline.geometry.attributes.position.needsUpdate = true;

            // Place the light and sprite near the end of the line
            positionAtT(guideLight.position, t * 0.98, p, v, g);
            positionAtT(guideSprite.position, t * 0.98, p, v, g);
        }
    }

    move(offset) {
        console.log("moving!")
        this.blinkerSphere.visible = true;
        this.blinkerSphere.material.opacity = 0;
        new TWEEN.Tween(this.blinkerSphere.material)
            .to({ opacity: 1 }, 200)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onStart(() => { console.log("started") })
            .onComplete(() => {
                // Do the teleport
                this.cameraGroup.position.add(offset);

                // Fade back
                new TWEEN.Tween(this.blinkerSphere.material)
                    .to({ opacity: 0 }, 200)
                    .onComplete(() => this.blinkerSphere.visible = false)
                    .start();
            })
            .start();
    }
}
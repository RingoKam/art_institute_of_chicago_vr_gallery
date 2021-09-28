import * as THREE from 'three'

export const createLogo = () => {
    var map = new THREE.TextureLoader().load("logo.png");
    var material = new THREE.SpriteMaterial({ map: map, color: 0xffffff });
    var logo = new THREE.Sprite(material);
    return logo
}
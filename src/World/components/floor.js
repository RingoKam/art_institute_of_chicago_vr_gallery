import * as THREE from 'three'

export const createFloor = () => {
    let geo = new THREE.PlaneBufferGeometry(10000, 10000)
    let mat = new THREE.MeshBasicMaterial({
        color: 'grey' 
    })
    let mesh = new THREE.Mesh(geo, mat)
    mesh.rotation.x = -Math.PI / 2;
    return mesh
}

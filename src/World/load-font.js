import { TextureLoader } from 'three'
import ThreeMeshUI from 'three-mesh-ui';
import FontJSON from '../assets/Roboto-msdf.json';

export const loadFont = () => {
  let textureLoader = new TextureLoader();
  textureLoader.load("Roboto-msdf.png", (texture) => {
    ThreeMeshUI.FontLibrary.addFont('Roboto', FontJSON, texture);
  })
}
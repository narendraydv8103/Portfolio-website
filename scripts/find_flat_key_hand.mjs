import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import fs from 'fs';

// Run headless three.js check on character.glb hand bones
const loader = new GLTFLoader();
const buf = fs.readFileSync('public/models/character.glb');
loader.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength), '', (gltf) => {
  const char = gltf.scene;
  const handL = char.getObjectByName('hand.L') || char.getObjectByName('handL');
  const handR = char.getObjectByName('hand.R') || char.getObjectByName('handR');
  const forearmR = char.getObjectByName('forearm.R') || char.getObjectByName('forearmR');

  console.log('hand.L default rot:', handL?.rotation);
  console.log('hand.R default rot:', handR?.rotation);

  // When hand is flat palm-down:
  // Palm down means the palm normal points in -Y (downwards) in world/char space.
  // Fingers point forward in +Z in char space.
});

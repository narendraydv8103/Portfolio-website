import * as THREE from 'three';

const cam = new THREE.PerspectiveCamera(27.5, 1892 / 888, 0.1, 1000);
cam.position.set(0, 5.7, 36.5);
cam.updateMatrixWorld();

const charRotY = 0.92;

function toScreen(localX, localY, localZ) {
  const v = new THREE.Vector3(localX, localY, localZ);
  v.applyAxisAngle(new THREE.Vector3(0, 1, 0), charRotY);
  v.project(cam);
  const sx = (v.x * 0.5 + 0.5) * 1892;
  const sy = (-(v.y * 0.5) + 0.5) * 888;
  return { sx, sy };
}

const headS = toScreen(0, 13.5, 0);
const monCurrent = toScreen(0.85, 8.95 + 2.35, 3.4);
console.log('Current head to mon delta X:', monCurrent.sx - headS.sx);

// Target delta X is 152.5 px
for (let mx = -0.5; mx <= 1.0; mx += 0.1) {
  for (let mz = 1.5; mz <= 3.5; mz += 0.1) {
    const monS = toScreen(mx, 8.95 + 2.35, mz);
    const dx = monS.sx - headS.sx;
    if (Math.abs(dx - 152.5) < 3.0) {
      console.log(`Candidate: mx=${mx.toFixed(2)}, mz=${mz.toFixed(2)} -> dx=${dx.toFixed(1)}, sy=${monS.sy.toFixed(1)}`);
    }
  }
}

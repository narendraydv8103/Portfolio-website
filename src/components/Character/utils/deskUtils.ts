import * as THREE from "three";

/**
 * Procedural soft radial floor contact shadow texture
 */
function createFloorShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.clearRect(0, 0, 512, 512);
    const grad = ctx.createRadialGradient(256, 256, 12, 256, 256, 250);
    grad.addColorStop(0, "rgba(0, 0, 0, 0.82)");
    grad.addColorStop(0.35, "rgba(0, 0, 0, 0.48)");
    grad.addColorStop(0.65, "rgba(0, 0, 0, 0.14)");
    grad.addColorStop(1, "rgba(0, 0, 0, 0.0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(256, 256, 250, 0, Math.PI * 2);
    ctx.fill();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Procedural 3D floor light pool texture (soft lilac/white core fading to transparent edges)
 */
function createFloorLightTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.clearRect(0, 0, 512, 512);
    const grad = ctx.createRadialGradient(256, 256, 8, 256, 256, 250);
    grad.addColorStop(0, "rgba(245, 235, 255, 0.92)");
    grad.addColorStop(0.25, "rgba(235, 215, 255, 0.62)");
    grad.addColorStop(0.55, "rgba(215, 190, 250, 0.24)");
    grad.addColorStop(0.80, "rgba(195, 165, 240, 0.06)");
    grad.addColorStop(1, "rgba(0, 0, 0, 0.0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(256, 256, 250, 0, Math.PI * 2);
    ctx.fill();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Procedural Monitor Screen Gradient Texture:
 * Pink face with gradient: lit #dc7aab (top right) fading to #6c4552 in shadow (bottom left),
 * with soft white-pink glow along the left and top edge.
 */
function createMonitorScreenTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const grad = ctx.createLinearGradient(512, 0, 0, 512);
    grad.addColorStop(0, "#dc7aab"); // lit top-right
    grad.addColorStop(0.55, "#ad5e7e");
    grad.addColorStop(1, "#6c4552"); // shadow bottom-left
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    // Soft white-pink glow along the left edge
    const leftGlow = ctx.createLinearGradient(0, 0, 70, 0);
    leftGlow.addColorStop(0, "rgba(255, 240, 250, 0.55)");
    leftGlow.addColorStop(1, "rgba(255, 240, 250, 0.0)");
    ctx.fillStyle = leftGlow;
    ctx.fillRect(0, 0, 70, 512);

    // Soft white-pink glow along the top edge
    const topGlow = ctx.createLinearGradient(0, 0, 0, 70);
    topGlow.addColorStop(0, "rgba(255, 240, 250, 0.45)");
    topGlow.addColorStop(1, "rgba(255, 240, 250, 0.0)");
    ctx.fillStyle = topGlow;
    ctx.fillRect(0, 0, 512, 70);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Procedural Desk Top Texture:
 * Pale pink/lilac top reflecting screen light, thin crisp surface.
 */
function createDeskTopTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#faf5f8";
    ctx.fillRect(0, 0, 512, 256);
    // Soft subtle pink reflection pool from monitor
    const grad = ctx.createRadialGradient(340, 160, 10, 340, 160, 230);
    grad.addColorStop(0, "rgba(235, 175, 205, 0.45)");
    grad.addColorStop(0.55, "rgba(245, 215, 230, 0.18)");
    grad.addColorStop(1, "rgba(250, 245, 248, 0.0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates the complete architectural studio workstation matching reference_seated.png:
 * 1. Minimalist developer desk: pale pink/lilac top (reflecting screen), thin white edge, two pairs of black T-legs with foot bars.
 * 2. Monitor slab on stand: rounded corners, grey-white bevel on left edge (#a7a6aa), pink gradient screen (#dc7aab -> #6c4552),
 *    top edge at eye level, slight back tilt ≈ 8°.
 * 3. Phone-stand plate in front of monitor on the right: tilted pink plate with white rim on thin base plate.
 * 4. Ergonomic white shell chair with warm wooden legs ending at floor.
 * 5. 3D floor light pool under feet and desk, with soft contact shadows.
 * 6. Cool cyan screen light (#bff3f0) casting highlights on avatar's face/teeth/chin/collar, and pink bounce light.
 */
export const createStudioDesk = (soleOffset: number = 2.2): THREE.Group => {
  const workstation = new THREE.Group();
  workstation.name = "StudioDesk";

  // ── 1. DESK GROUP (Slides in horizontally from right x ≈ +20 -> 0) ──
  const deskGroup = new THREE.Group();
  deskGroup.name = "DeskGroup";

  // 1.0 3D Floor Light Pool (Lying flat on floor, additive blending, under workstation & feet)
  const lightGeo = new THREE.PlaneGeometry(14.5, 10.5);
  const lightMat = new THREE.MeshBasicMaterial({
    map: createFloorLightTexture(),
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    opacity: 0.95,
  });
  const floorLight = new THREE.Mesh(lightGeo, lightMat);
  floorLight.name = "FloorLightPool";
  floorLight.rotation.x = -Math.PI / 2;
  floorLight.position.set(0.25, soleOffset + 0.015, 1.8);
  deskGroup.add(floorLight);

  // Soft Contact Shadow Plane Grounding Setup
  const shadowGeo = new THREE.PlaneGeometry(12.5, 8.8);
  const shadowMat = new THREE.MeshBasicMaterial({
    map: createFloorShadowTexture(),
    transparent: true,
    opacity: 0.75,
    depthWrite: false,
  });
  const floorShadow = new THREE.Mesh(shadowGeo, shadowMat);
  floorShadow.name = "FloorContactShadow";
  floorShadow.rotation.x = -Math.PI / 2;
  floorShadow.position.set(0.25, soleOffset + 0.02, 1.8);
  deskGroup.add(floorShadow);

  // 1.1 Architectural Desk Top (local y = 8.95 -> world y ≈ 6.74 when seated)
  // Desk width 7.4, depth 3.6, pale pink/lilac top with thin white edge
  const topGeo = new THREE.BoxGeometry(7.4, 0.16, 3.6);
  const topMat = new THREE.MeshStandardMaterial({
    map: createDeskTopTexture(),
    roughness: 0.25,
    metalness: 0.04,
  });
  const tabletop = new THREE.Mesh(topGeo, topMat);
  tabletop.name = "DeskTop";
  tabletop.position.set(0.3, 8.95, 2.6);
  tabletop.castShadow = true;
  tabletop.receiveShadow = true;
  deskGroup.add(tabletop);

  // Thin White Bevel Edge along the front & sides of desk
  const edgeGeo = new THREE.BoxGeometry(7.42, 0.03, 3.62);
  const edgeMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.2,
    metalness: 0.05,
  });
  const deskEdge = new THREE.Mesh(edgeGeo, edgeMat);
  deskEdge.name = "DeskWhiteEdge";
  deskEdge.position.set(0.3, 8.95, 2.6);
  deskGroup.add(deskEdge);

  // 1.2 Desk Pad under Keyboard
  const padGeo = new THREE.BoxGeometry(4.8, 0.02, 2.2);
  const padMat = new THREE.MeshStandardMaterial({
    color: 0x18181b,
    roughness: 0.7,
    metalness: 0.1,
  });
  const pad = new THREE.Mesh(padGeo, padMat);
  pad.name = "DeskPad";
  pad.position.set(0.1, 9.04, 2.45);
  pad.receiveShadow = true;
  deskGroup.add(pad);

  // 1.3 Minimalist Steel T-Legs with white top edge on foot bars
  const legMat = new THREE.MeshStandardMaterial({
    color: 0x111113,
    roughness: 0.35,
    metalness: 0.85,
  });
  const footTopMat = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9, // Crisp white top edge on foot bars
    roughness: 0.3,
    metalness: 0.2,
  });

  const undersideY = 8.95 - 0.08; // 8.87
  const footHeight = 0.08;
  const colHeight = undersideY - (soleOffset + footHeight);
  const colCenterY = (soleOffset + footHeight) + colHeight / 2;

  [-2.9, 3.4].forEach((x, idx) => {
    // Upright column
    const colGeo = new THREE.BoxGeometry(0.16, colHeight, 0.2);
    const col = new THREE.Mesh(colGeo, legMat);
    col.name = `DeskLegCol_${idx === 0 ? "L" : "R"}`;
    col.position.set(x, colCenterY, 2.6);
    col.castShadow = true;
    deskGroup.add(col);

    // Floor base foot bar (rests exactly on soleOffset floor)
    const footGeo = new THREE.BoxGeometry(0.24, footHeight, 2.8);
    const foot = new THREE.Mesh(footGeo, legMat);
    foot.name = `DeskLegFoot_${idx === 0 ? "L" : "R"}`;
    foot.position.set(x, soleOffset + footHeight / 2, 2.6);
    foot.castShadow = true;
    deskGroup.add(foot);

    // White top highlight strip on foot bar
    const footCapGeo = new THREE.BoxGeometry(0.24, 0.015, 2.8);
    const footCap = new THREE.Mesh(footCapGeo, footTopMat);
    footCap.position.set(x, soleOffset + footHeight + 0.007, 2.6);
    deskGroup.add(footCap);
  });

  // Crossbeam between legs
  const beamGeo = new THREE.BoxGeometry(6.3, 0.12, 0.12);
  const beam = new THREE.Mesh(beamGeo, legMat);
  beam.name = "DeskCrossBeam";
  beam.position.set(0.25, soleOffset + 0.9, 2.6);
  deskGroup.add(beam);

  // ── 1.4 PINK DESKTOP MONITOR SLAB ON STAND (Match Landmarks & Reference Image) ──
  // Landmarks: width ≈ 1.2 H (3.6), height ≈ 1.25 H (3.75), thickness ≈ 0.1 H (0.3).
  // Sits on desk behind keyboard at z = 3.4, slightly right of keyboard center (x = 0.85).
  // Back tilt ≈ 8° (-0.14 rad). Top edge around eye level.
  const monitorGroup = new THREE.Group();
  monitorGroup.name = "DesktopMonitorGroup";
  monitorGroup.position.set(0.55, 8.95, 3.4);

  // Stand Base Plate (Resting flat on desk top)
  const baseGeo = new THREE.BoxGeometry(1.4, 0.035, 1.1);
  const standMat = new THREE.MeshStandardMaterial({
    color: 0xefd3df, // Pale metallic pink stand
    roughness: 0.3,
    metalness: 0.25,
  });
  const standBase = new THREE.Mesh(baseGeo, standMat);
  standBase.name = "MonitorStandBase";
  standBase.position.set(0, 0.018, 0);
  standBase.castShadow = true;
  standBase.receiveShadow = true;
  monitorGroup.add(standBase);

  // Stand Neck
  const neckGeo = new THREE.BoxGeometry(0.26, 1.35, 0.10);
  const standNeck = new THREE.Mesh(neckGeo, standMat);
  standNeck.name = "MonitorStandNeck";
  standNeck.position.set(0, 0.68, -0.05);
  standNeck.rotation.x = -0.14; // Back tilt ~8°
  standNeck.castShadow = true;
  monitorGroup.add(standNeck);

  // Monitor Body Slab (Width = 4.4, Height = 3.5, Thickness = 0.3)
  const bodyGeo = new THREE.BoxGeometry(4.4, 3.5, 0.30);
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xf472b6, // Elegant pastel pink enclosure
    roughness: 0.35,
    metalness: 0.12,
  });
  const monitorBody = new THREE.Mesh(bodyGeo, bodyMat);
  monitorBody.name = "MonitorBody";
  monitorBody.position.set(0, 2.22, -0.12);
  monitorBody.rotation.x = -0.14; // Back tilt ~8°
  monitorBody.castShadow = true;
  monitorGroup.add(monitorBody);

  // Grey-white Bevel Strip along left edge (≈ #a7a6aa)
  const bevelGeo = new THREE.BoxGeometry(0.08, 3.51, 0.31);
  const bevelMat = new THREE.MeshStandardMaterial({
    color: 0xa7a6aa, // Grey-white left bevel
    roughness: 0.4,
    metalness: 0.2,
  });
  const bevelLeft = new THREE.Mesh(bevelGeo, bevelMat);
  bevelLeft.name = "MonitorLeftBevel";
  bevelLeft.position.set(-2.21, 2.22, -0.12);
  bevelLeft.rotation.x = -0.14;
  monitorGroup.add(bevelLeft);

  // Pink Gradient Emissive Screen Face (#dc7aab top-right -> #6c4552 bottom-left)
  const screenGeo = new THREE.PlaneGeometry(4.28, 3.38);
  const screenMat = new THREE.MeshStandardMaterial({
    map: createMonitorScreenTexture(),
    emissive: 0xdc7aab,
    emissiveIntensity: 0.65,
    roughness: 0.22,
    metalness: 0.05,
  });
  const screenMesh = new THREE.Mesh(screenGeo, screenMat);
  screenMesh.name = "MonitorScreen";
  screenMesh.position.set(0, 2.22, 0.035);
  screenMesh.rotation.x = -0.14;
  monitorGroup.add(screenMesh);

  // 1.5 SCREEN LIGHTS (Section 6: Cast cool cyan-white light onto avatar)
  // Cool cyan-white light directed towards avatar's teeth, chin, cheek, collar
  const cyanScreenLight = new THREE.PointLight(0xbff3f0, 0, 10, 1.8);
  cyanScreenLight.name = "CyanScreenLight";
  cyanScreenLight.position.set(-1.0, 2.35, -0.8);
  cyanScreenLight.castShadow = false;
  monitorGroup.add(cyanScreenLight);

  // Low-intensity soft pink bounce light
  const pinkBounceLight = new THREE.PointLight(0xf472b6, 0, 6, 2.0);
  pinkBounceLight.name = "PinkBounceLight";
  pinkBounceLight.position.set(0.6, 2.35, -0.5);
  pinkBounceLight.castShadow = false;
  monitorGroup.add(pinkBounceLight);

  // ── 1.6 PHONE-STAND PLATE (In front of monitor on the right) ──
  // Landmarks: bounding box ≈ x 925–1000, y 268–375 (≈ 0.5 H wide × 0.75 H tall = 1.5 × 2.25)
  // Tilted pink plate with white rim on thin white base plate
  const phoneGroup = new THREE.Group();
  phoneGroup.name = "PhoneStandGroup";
  phoneGroup.position.set(1.55, 8.95, 2.75);

  // Phone Stand Base Plate (White)
  const phoneBaseGeo = new THREE.BoxGeometry(0.95, 0.025, 0.85);
  const whiteRimMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.25,
    metalness: 0.05,
  });
  const phoneBase = new THREE.Mesh(phoneBaseGeo, whiteRimMat);
  phoneBase.position.set(0, 0.012, 0);
  phoneBase.receiveShadow = true;
  phoneGroup.add(phoneBase);

  // Phone Stand Strut
  const phoneStrutGeo = new THREE.BoxGeometry(0.12, 0.8, 0.08);
  const phoneStrut = new THREE.Mesh(phoneStrutGeo, standMat);
  phoneStrut.position.set(0, 0.4, 0.05);
  phoneStrut.rotation.x = -0.35;
  phoneGroup.add(phoneStrut);

  // Tilted Pink Plate with White Rim (Width = 1.35, Height = 2.1, Thickness = 0.05)
  // White backing rim:
  const phoneRimGeo = new THREE.BoxGeometry(1.42, 2.15, 0.05);
  const phoneRim = new THREE.Mesh(phoneRimGeo, whiteRimMat);
  phoneRim.position.set(0, 1.15, 0.15);
  phoneRim.rotation.x = -0.38; // Tilted back ~22°
  phoneRim.castShadow = true;
  phoneGroup.add(phoneRim);

  // Pink face plate:
  const phonePlateGeo = new THREE.BoxGeometry(1.32, 2.05, 0.04);
  const phonePlateMat = new THREE.MeshStandardMaterial({
    color: 0xeb79a8, // Tilted pink face plate
    roughness: 0.35,
    metalness: 0.1,
  });
  const phonePlate = new THREE.Mesh(phonePlateGeo, phonePlateMat);
  phonePlate.position.set(0, 1.15, 0.17);
  phonePlate.rotation.x = -0.38;
  phonePlate.castShadow = true;
  phoneGroup.add(phonePlate);

  deskGroup.add(phoneGroup);
  deskGroup.add(monitorGroup);
  workstation.add(deskGroup);

  // ── 2. CHAIR GROUP (Arrives from behind z ≈ -10 -> 0 & fades in opacity 0 -> 1) ──
  const chairGroup = new THREE.Group();
  chairGroup.name = "ChairGroup";

  const chairShellMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc, // Crisp white shell
    roughness: 0.3,
    metalness: 0.05,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1,
  });

  // 2.1 Chair Seat Pan (local y = 5.85 -> world y ≈ 3.65 when seated)
  const seatGeo = new THREE.BoxGeometry(2.5, 0.14, 2.4);
  const seat = new THREE.Mesh(seatGeo, chairShellMat);
  seat.name = "ChairSeat";
  seat.position.set(0, 5.85, -0.20);
  seat.castShadow = true;
  seat.receiveShadow = true;
  chairGroup.add(seat);

  // 2.2 Chair Backrest
  const backGeo = new THREE.BoxGeometry(2.3, 2.6, 0.12);
  const back = new THREE.Mesh(backGeo, chairShellMat);
  back.name = "ChairBack";
  back.position.set(0, 7.15, -1.30);
  back.rotation.x = -0.10;
  back.castShadow = true;
  chairGroup.add(back);

  // 2.3 Wooden Chair Legs (Warm natural wood ending exactly at soleOffset floor)
  const chairLegMat = new THREE.MeshStandardMaterial({
    color: 0xc89666, // Warm natural oak wood dowel legs
    roughness: 0.65,
    metalness: 0.02,
    transparent: true,
    opacity: 1,
  });

  const seatUnderside = 5.85 - 0.07; // 5.78
  const legSpanY = seatUnderside - soleOffset;
  const legCenterY = soleOffset + legSpanY / 2;

  const legPositions = [
    { x: -0.95, z: -1.10, rotX: -0.14, rotZ: 0.12 },
    { x: 0.95, z: -1.10, rotX: -0.14, rotZ: -0.12 },
    { x: -0.95, z: 0.70, rotX: 0.14, rotZ: 0.12 },
    { x: 0.95, z: 0.70, rotX: 0.14, rotZ: -0.12 },
  ];

  legPositions.forEach((pos, idx) => {
    const tilt = Math.hypot(pos.rotX, pos.rotZ);
    const legLen = legSpanY / Math.cos(tilt);
    const chairLegGeo = new THREE.CylinderGeometry(0.09, 0.08, legLen, 16);
    const chairLeg = new THREE.Mesh(chairLegGeo, chairLegMat);
    chairLeg.name = `ChairLeg_${idx}`;
    chairLeg.position.set(pos.x, legCenterY, pos.z);
    chairLeg.rotation.x = pos.rotX;
    chairLeg.rotation.z = pos.rotZ;
    chairLeg.castShadow = true;
    chairGroup.add(chairLeg);
  });

  workstation.add(chairGroup);

  return workstation;
};

export default createStudioDesk;
